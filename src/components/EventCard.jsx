import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CATEGORY_ICONS } from '../constants';
import './EventCard.css';

const EventCard = ({ event }) => {
  const isSoldOut = event.availableTickets === 0;
  const isExpired = new Date(event.date) < new Date();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="event-card">
      <img 
        src={event.image} 
        alt={`${event.title} - ${event.category} event`} 
        className="event-image"
        loading="lazy"
      />
      
      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-category">
            <i className={CATEGORY_ICONS[event.category] || 'fas fa-calendar'}></i> 
            {event.category}
          </span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="event-detail">
            <i className="fas fa-calendar-alt event-detail-icon" aria-hidden="true"></i>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-detail">
            <i className="fas fa-clock event-detail-icon" aria-hidden="true"></i>
            <span>{event.time}</span>
          </div>
          <div className="event-detail">
            <i className="fas fa-map-marker-alt event-detail-icon" aria-hidden="true"></i>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="event-footer">
          <div>
            <div className="event-price">
              <i className="fas fa-rupee-sign" aria-hidden="true"></i>{event.price}
              <span className="event-price-label"> /ticket</span>
            </div>
            <div className={`event-availability ${isSoldOut ? 'sold-out' : ''}`}>
              {isSoldOut ? (
                <>
                  <i className="fas fa-exclamation-circle" aria-hidden="true"></i> 
                  Sold Out
                </>
              ) : (
                <>
                  <i className="fas fa-ticket-alt" aria-hidden="true"></i> 
                  {event.availableTickets} tickets left
                </>
              )}
            </div>
          </div>
          
          <Link 
            to={`/event/${event.id}`} 
            className={`btn ${isSoldOut || isExpired ? 'btn-disabled' : 'btn-primary'}`}
            onClick={(e) => (isSoldOut || isExpired) && e.preventDefault()}
            aria-label={
              isSoldOut 
                ? `${event.title} is sold out` 
                : isExpired 
                  ? `${event.title} has expired` 
                  : `View details for ${event.title}`
            }
          >
            {isSoldOut ? (
              <>
                <i className="fas fa-ban" aria-hidden="true"></i> 
                Sold Out
              </>
            ) : isExpired ? (
              <>
                <i className="fas fa-calendar-times" aria-hidden="true"></i> 
                Expired
              </>
            ) : ( 
              <>
                <i className="fas fa-arrow-right" aria-hidden="true"></i> 
                View Details
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availableTickets: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default EventCard;
