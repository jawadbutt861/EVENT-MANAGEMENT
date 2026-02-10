import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import './ManageEvents.css';

const ManageEvents = () => {
  const { userRole } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const eventDate = new Date(data.date);
        
        // Only include future events
        if (eventDate >= today) {
          eventsData.push({ id: docSnap.id, ...data });
        } else {
          // Auto-delete expired events
          deleteDoc(doc(db, 'events', docSnap.id));
        }
      });

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }

    try {
      // Check if there are any bookings for this event
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('eventId', '==', eventId)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      if (!bookingsSnapshot.empty) {
        alert('Cannot delete event with existing bookings. Please contact attendees first.');
        return;
      }

      await deleteDoc(doc(db, 'events', eventId));
      alert('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  if (userRole !== 'organizer') {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Only organizers can manage events.</p>
      </div>
    );
  }

  return (
    <div className="manage-events">
      <div className="container">
        <div className="manage-events-header">
          <h1 className="page-title">
            <i className="fas fa-cog"></i> Manage Events
          </h1>
          <Link to="/create-event" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Create New Event
          </Link>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : events.length === 0 ? (
          <div className="no-events-manage">
            <i className="fas fa-calendar-times no-events-icon"></i>
            <h2>No Events Created</h2>
            <p>Create your first event to get started</p>
            <Link to="/create-event" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i> Create Event
            </Link>
          </div>
        ) : (
          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Tickets</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="event-cell">
                        <img src={event.image} alt={event.title} className="event-thumb" />
                        <div>
                          <div className="event-title-cell">{event.title}</div>
                          <div className="event-desc-cell">{event.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <i className="fas fa-calendar-alt"></i>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td>
                      <div className="location-cell">
                        <i className="fas fa-map-marker-alt"></i>
                        {event.location}
                      </div>
                    </td>
                    <td>
                      <div className="price-cell">₹{event.price}</div>
                    </td>
                    <td>
                      <div className="tickets-cell">
                        <span className={event.availableTickets === 0 ? 'sold-out' : ''}>
                          {event.availableTickets} / {event.totalTickets}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{event.category}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/edit-event/${event.id}`}
                          className="btn-icon btn-edit"
                          title="Edit Event"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="btn-icon btn-delete"
                          title="Delete Event"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
