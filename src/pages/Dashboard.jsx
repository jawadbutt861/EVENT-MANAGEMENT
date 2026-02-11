/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = () => {
  const { userRole } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [stats, setStats] = useState({ total: 0, valid: 0, used: 0, revenue: 0 });
  const [loading, setLoading] = useState(false);
  const [ticketIdInput, setTicketIdInput] = useState('');
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      // Get Firestore events only
      const querySnapshot = await getDocs(collection(db, 'events'));
      const firestoreEvents = [];
      querySnapshot.forEach((docSnap) => {
        firestoreEvents.push({ id: docSnap.id, ...docSnap.data() });
      });
      
      setAllEvents(firestoreEvents);
      
      if (firestoreEvents.length > 0) {
        setSelectedEvent(firestoreEvents[0].id);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setAllEvents([]);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      fetchAttendees();
    }
  }, [selectedEvent]);

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'bookings'),
        where('eventId', '==', selectedEvent)
      );
      const querySnapshot = await getDocs(q);
      const attendeesData = [];
      let totalRevenue = 0;
      let validCount = 0;
      let usedCount = 0;

      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        attendeesData.push(data);
        totalRevenue += data.price;
        if (data.status === 'valid') validCount++;
        if (data.status === 'used') usedCount++;
      });

      setAttendees(attendeesData);
      setStats({
        total: attendeesData.length,
        valid: validCount,
        used: usedCount,
        revenue: totalRevenue
      });
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateTicket = async () => {
    if (!ticketIdInput.trim()) {
      alert('Please enter a ticket ID');
      return;
    }

    const ticket = attendees.find(a => a.ticketId === ticketIdInput.trim());
    
    if (!ticket) {
      alert('❌ Invalid Ticket ID');
      return;
    }

    if (ticket.status === 'used') {
      alert('⚠️ This ticket has already been used');
      return;
    }

    try {
      await updateDoc(doc(db, 'bookings', ticket.id), {
        status: 'used',
        usedAt: new Date().toISOString()
      });
      
      alert('✅ Ticket validated successfully!');
      setTicketIdInput('');
      fetchAttendees();
    } catch (error) {
      console.error('Error validating ticket:', error);
      alert('Failed to validate ticket');
    }
  };

  if (userRole !== 'organizer') {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Only organizers can access this page.</p>
      </div>
    );
  }

  const currentEvent = allEvents.find(e => e.id === selectedEvent);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-title-row">
          <h1 className="page-title">Organizer Dashboard</h1>
          <div className="dashboard-actions">
            <Link to="/manage-events" className="btn btn-secondary">
              <i className="fas fa-cog"></i> Manage Events
            </Link>
            <Link to="/create-event" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i> Create Event
            </Link>
          </div>
        </div>

        <div className="dashboard-header">
          <div className="event-selector">
            <label>Select Event:</label>
            {allEvents.length > 0 ? (
              <select
                value={selectedEvent || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedEvent(value);
                }}
                className="event-select"
              >
                {allEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            ) : (
              <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
                No events created yet. Create your first event to get started!
              </p>
            )}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tickets Sold</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.valid}</div>
              <div className="stat-label">Valid Tickets</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.used}</div>
              <div className="stat-label">Checked-in</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">₹{stats.revenue}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>
        </div>

        <div className="validator-section">
          <h2><i className="fas fa-qrcode"></i> Ticket Validator</h2>
          <div className="validator-card">
            <input
              type="text"
              value={ticketIdInput}
              onChange={(e) => setTicketIdInput(e.target.value)}
              placeholder="Enter Ticket ID or scan QR code"
              className="validator-input"
            />
            <button onClick={validateTicket} className="btn btn-primary">
              <i className="fas fa-check-circle"></i> Validate Ticket
            </button>
          </div>
        </div>

        <div className="attendees-section">
          <h2><i className="fas fa-users"></i> Attendees List</h2>
          
          {loading ? (
            <div className="spinner"></div>
          ) : attendees.length === 0 ? (
            <div className="no-attendees">
              <p>No tickets booked for this event yet.</p>
            </div>
          ) : (
            <div className="attendees-table-wrapper">
              <table className="attendees-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Email</th>
                    <th>Booking Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee) => (
                    <tr key={attendee.id}>
                      <td>
                        <code className="ticket-id-code">{attendee.ticketId}</code>
                      </td>
                      <td>{attendee.userEmail}</td>
                      <td>
                        {new Date(attendee.bookingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td>₹{attendee.price}</td>
                      <td>
                        <span className={`status-badge status-${attendee.status}`}>
                          {attendee.status === 'valid' ? (
                            <><i className="fas fa-check-circle"></i> Valid</>
                          ) : (
                            <><i className="fas fa-times-circle"></i> Used</>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
