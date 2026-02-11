/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase/firebaseconfig';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userRole } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userTicketCount, setUserTicketCount] = useState(0);
  const [fetchingEvent, setFetchingEvent] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id, currentUser]);

  const fetchEvent = async () => {
    try {
      setFetchingEvent(true);
      
      // Check Firestore for the event
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const firestoreEvent = { id: docSnap.id, ...docSnap.data() };
        setEvent(firestoreEvent);
        if (currentUser) {
          await checkUserTickets(firestoreEvent.id);
        }
      } else {
        setEvent(null);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setEvent(null);
    } finally {
      setFetchingEvent(false);
    }
  };

  const checkUserTickets = async (eventId) => {
    try {
      if (userRole === 'organizer') {
        // For organizers, get total sold tickets for this event
        const q = query(
          collection(db, 'bookings'),
          where('eventId', '==', eventId)
        );
        const querySnapshot = await getDocs(q);
        setUserTicketCount(querySnapshot.size);
      } else {
        // For attendees, get their own tickets
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid),
          where('eventId', '==', eventId)
        );
        const querySnapshot = await getDocs(q);
        setUserTicketCount(querySnapshot.size);
      }
    } catch (error) {
      console.error('Error checking tickets:', error);
    }
  };

  const handleBookTicket = async () => {
    if (!currentUser) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }

    if (userRole === 'organizer') {
      alert('Organizers cannot book tickets. Please use an attendee account.');
      return;
    }

    if (userTicketCount >= 2) {
      alert('You can only book maximum 2 tickets per event');
      return;
    }

    if (event.availableTickets === 0) {
      alert('Sorry, this event is sold out');
      return;
    }

    try {
      setLoading(true);
      
      const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      
      await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        ticketId: ticketId,
        price: event.price,
        bookingDate: new Date().toISOString(),
        status: 'valid'
      });

      event.availableTickets -= 1;
      
      alert('Ticket booked successfully! Check "My Tickets" to view your QR code.');
      navigate('/my-tickets');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingEvent) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '20px' }}>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return <div className="container" style={{ padding: '40px 20px' }}>Event not found</div>;
  }

  const isSoldOut = event.availableTickets === 0;
  const isExpired = new Date(event.date) < new Date();
  const isOrganizer = userRole === 'organizer';
  const canBook = !isSoldOut && !isExpired && !isOrganizer && userTicketCount < 2;

  return (
    <div className="event-details">
      <div className="event-details-hero">
        <img src={event.image} alt={event.title} className="event-details-image" />
      </div>

      <div className="container">
        <div className="event-details-content">
          <div className="event-details-main">
            <div className="event-details-header">
              <h1 className="event-details-title">{event.title}</h1>
              <span className="event-category-badge">{event.category}</span>
            </div>

            <div className="event-info-grid">
              <div className="event-info-item">
                <i className="fas fa-calendar-alt event-info-icon"></i>
                <div>
                  <div className="event-info-label">Date</div>
                  <div className="event-info-value">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <div className="event-info-item">
                <i className="fas fa-clock event-info-icon"></i>
                <div>
                  <div className="event-info-label">Time</div>
                  <div className="event-info-value">{event.time}</div>
                </div>
              </div>

              <div className="event-info-item">
                <i className="fas fa-map-marker-alt event-info-icon"></i>
                <div>
                  <div className="event-info-label">Location</div>
                  <div className="event-info-value">{event.location}</div>
                </div>
              </div>
            </div>

            <div className="event-description-section">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>
          </div>

          <div className="event-details-sidebar">
            <div className="booking-card">
              <div className="booking-price">
                <span className="price-amount">
                  <i className="fas fa-rupee-sign"></i>{event.price}
                </span>
                <span className="price-label">per ticket</span>
              </div>

              <div className="booking-info">
                <div className="booking-info-item">
                  <span><i className="fas fa-ticket-alt"></i> Available Tickets:</span>
                  <strong className={isSoldOut ? 'text-error' : 'text-success'}>
                    {isSoldOut ? 'Sold Out' : event.availableTickets}
                  </strong>
                </div>
                {currentUser && (
                  <div className="booking-info-item">
                    <span>
                      <i className={isOrganizer ? "fas fa-chart-line" : "fas fa-user"}></i>
                      {isOrganizer ? ' Sold Tickets:' : ' Your Tickets:'}
                    </span>
                    <strong>{isOrganizer ? userTicketCount : `${userTicketCount} / 2`}</strong>
                  </div>
                )}
              </div>

              {!isOrganizer && (
                <button
                  onClick={handleBookTicket}
                  disabled={!canBook || loading}
                  className={`btn btn-full ${canBook ? 'btn-primary' : 'btn-disabled'}`}
                >
                  {loading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Booking...</>
                  ) : !currentUser ? (
                    <><i className="fas fa-sign-in-alt"></i> Login to Book</>
                  ) : isSoldOut ? (
                    <><i className="fas fa-exclamation-circle"></i> Sold Out</>
                  ) : isExpired ? (
                    <><i className="fas fa-calendar-times"></i> Event Expired</>
                  ) : userTicketCount >= 2 ? (
                    <><i className="fas fa-check-circle"></i> Max Tickets Reached</>
                  ) : (
                    <><i className="fas fa-ticket-alt"></i> Book Ticket Now</>
                  )}
                </button>
              )}

              {!currentUser && (
                <p className="booking-note">Please login to book tickets</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
