/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import EventCard from '../components/EventCard';
import { db } from '../config/firebase/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import { COLLECTIONS, CATEGORY_ICONS } from '../constants';
import { ErrorHandler, handlePromise } from '../utils/errorHandler';
import './Home.css';

const Home = () => {
  const { userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.EVENTS));
      const firestoreEvents = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Process events and filter out expired ones
      const eventPromises = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const eventDate = new Date(data.date);
        
        // Only include future events
        if (eventDate >= today) {
          firestoreEvents.push({ id: docSnap.id, ...data });
        }
        // Note: Removed auto-delete of expired events to avoid unhandled promise rejections
        // This should be handled by a scheduled cleanup job instead
      });
      
      setEvents(firestoreEvents);
    } catch (error) {
      ErrorHandler.showError(error, 'Home.fetchEvents');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handlePromise(fetchEvents(), 'Home.useEffect');
  }, [fetchEvents]);

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => {
    const eventCategories = [...new Set(events.map(event => event.category))];
    return ['All', ...eventCategories];
  }, [events]);

  // Memoize filtered events for performance
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          {userRole === 'organizer' ? (
            <>
              <h1 className="hero-title">Event Management Dashboard</h1>
              <p className="hero-subtitle">Monitor, manage, and track all your events in one place</p>
            </>
          ) : (
            <>
              <h1 className="hero-title">Experience Unforgettable Moments</h1>
              <p className="hero-subtitle">Discover and book tickets for the best events happening around you</p>
            </>
          )}
          
          <div className="search-bar">
            <label htmlFor="event-search" className="sr-only">Search events</label>
            <i className="fas fa-search search-icon" aria-hidden="true"></i>
            <input
              id="event-search"
              type="text"
              placeholder="Search by event name, category, or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              aria-label="Search events by name, category, or location"
            />
          </div>

          <div className="category-filter">
            <div className="filter-label">
              <i className="fas fa-filter" aria-hidden="true"></i> Filter by Category:
            </div>
            <div className="category-buttons" role="group" aria-label="Event category filters">
              {categories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  aria-pressed={selectedCategory === category}
                  aria-label={`Filter by ${category} category`}
                >
                  <i className={CATEGORY_ICONS[category] || 'fas fa-calendar'} aria-hidden="true"></i>
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-calendar-alt" aria-hidden="true"></i> Upcoming Events
            </h2>
            <p className="section-subtitle">
              {loading ? 'Loading...' : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'} available`}
            </p>
          </div>
          
          {loading ? (
            <div className="spinner" role="status" aria-label="Loading events"></div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-events">
              <i className="fas fa-search no-events-icon" aria-hidden="true"></i>
              <h3>No Events Found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
