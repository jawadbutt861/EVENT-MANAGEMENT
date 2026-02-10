import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const isSoldOut = event.availableTickets === 0;
  const isExpired = new Date(event.date) < new Date();

  const categoryIcons = {
    'Technology': 'fas fa-laptop-code',
    'Music': 'fas fa-music',
    'Business': 'fas fa-briefcase',
    'Art': 'fas fa-palette',
    'Food': 'fas fa-utensils'
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      
      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-category">
            <i className={categoryIcons[event.category]}></i> {event.category}
          </span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="event-detail">
            <i className="fas fa-calendar-alt event-detail-icon"></i>
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="event-detail">
            <i className="fas fa-clock event-detail-icon"></i>
            <span>{event.time}</span>
          </div>
          <div className="event-detail">
            <i className="fas fa-map-marker-alt event-detail-icon"></i>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="event-footer">
          <div>
            <div className="event-price">
              <i className="fas fa-rupee-sign"></i>{event.price}
              <span className="event-price-label"> /ticket</span>
            </div>
            <div className={`event-availability ${isSoldOut ? 'sold-out' : ''}`}>
              {isSoldOut ? (
                <><i className="fas fa-exclamation-circle"></i> Sold Out</>
              ) : (
                <><i className="fas fa-ticket-alt"></i> {event.availableTickets} tickets left</>
              )}
            </div>
          </div>
          
          <Link 
            to={`/event/${event.id}`} 
            className={`btn ${isSoldOut || isExpired ? 'btn-disabled' : 'btn-primary'}`}
            onClick={(e) => (isSoldOut || isExpired) && e.preventDefault()}
          >
            {isSoldOut ? (
              <><i className="fas fa-ban"></i> Sold Out</>
            ) : isExpired ? (
              <><i className="fas fa-calendar-times"></i> Expired</>
            ) : ( 
              <><i className="fas fa-arrow-right"></i> View Details</>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
