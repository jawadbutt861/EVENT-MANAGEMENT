/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase/firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';
import './MyTickets.css';

const MyTickets = () => {
  const { currentUser, userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchTickets();
    }
  }, [currentUser]);

  const fetchTickets = async () => {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const ticketsData = [];
      querySnapshot.forEach((doc) => {
        ticketsData.push({ id: doc.id, ...doc.data() });
      });
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = (ticketId) => {
    const svg = document.getElementById(`qr-${ticketId}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `ticket-${ticketId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="my-tickets">
      <div className="container">
        <h1 className="page-title">My Tickets</h1>

        {userRole === 'organizer' ? (
          <div className="no-tickets">
            <i className="fas fa-user-tie no-tickets-icon"></i>
            <h2>Organizer Account</h2>
            <p>Organizers cannot book tickets. Use the Dashboard to manage events and attendees.</p>
            <a href="/dashboard" className="btn btn-primary">
              <i className="fas fa-chart-line"></i> Go to Dashboard
            </a>
          </div>
        ) : tickets.length === 0 ? (
          <div className="no-tickets">
            <i className="fas fa-ticket-alt no-tickets-icon"></i>
            <h2>No Tickets Yet</h2>
            <p>You haven't booked any tickets. Browse events and book your first ticket!</p>
            <a href="/" className="btn btn-primary">
              <i className="fas fa-calendar-alt"></i> Browse Events
            </a>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <h3 className="ticket-event-title">{ticket.eventTitle}</h3>
                  <span className={`ticket-status ${ticket.status}`}>
                    {ticket.status === 'valid' ? (
                      <><i className="fas fa-check-circle"></i> Valid</>
                    ) : (
                      <><i className="fas fa-times-circle"></i> Used</>
                    )}
                  </span>
                </div>

                <div className="ticket-divider"></div>

                <div className="ticket-body">
                  <div className="ticket-info">
                    <div className="ticket-info-row">
                      <span className="ticket-info-label">
                        <i className="fas fa-calendar-alt"></i> Date:
                      </span>
                      <span className="ticket-info-value">
                        {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="ticket-info-row">
                      <span className="ticket-info-label">
                        <i className="fas fa-clock"></i> Time:
                      </span>
                      <span className="ticket-info-value">{ticket.eventTime}</span>
                    </div>
                    <div className="ticket-info-row">
                      <span className="ticket-info-label">
                        <i className="fas fa-map-marker-alt"></i> Location:
                      </span>
                      <span className="ticket-info-value">{ticket.eventLocation}</span>
                    </div>
                    <div className="ticket-info-row">
                      <span className="ticket-info-label">
                        <i className="fas fa-rupee-sign"></i> Price:
                      </span>
                      <span className="ticket-info-value">₹{ticket.price}</span>
                    </div>
                  </div>

                  <div className="ticket-qr-section">
                    <div className="qr-code-wrapper">
                      <QRCodeSVG
                        id={`qr-${ticket.ticketId}`}
                        value={ticket.ticketId}
                        size={180}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <div className="ticket-id">
                      <small>Ticket ID</small>
                      <code>{ticket.ticketId}</code>
                    </div>
                  </div>
                </div>

                <div className="ticket-footer">
                  <button
                    onClick={() => downloadQR(ticket.ticketId)}
                    className="btn btn-secondary btn-small"
                  >
                    <i className="fas fa-download"></i> Download QR
                  </button>
                  <small className="ticket-booked-date">
                    <i className="fas fa-calendar-check"></i> Booked on {new Date(ticket.bookingDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
