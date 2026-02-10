/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/events';
import { db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Home.css';

const Home = () => {
  const { userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const firestoreEvents = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const eventDate = new Date(data.date);
        
        // Only include future events
        if (eventDate >= today) {
          firestoreEvents.push({ id: docSnap.id, ...data });
        } else {
          // Auto-delete expired events
          deleteDoc(doc(db, 'events', docSnap.id));
        }
      });
      
      setEvents(firestoreEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryIcons = {
    'All': 'fas fa-th-large',
    'Technology': 'fas fa-laptop-code',
    'Music': 'fas fa-music',
    'Business': 'fas fa-briefcase',
    'Art': 'fas fa-palette',
    'Food': 'fas fa-utensils'
  };

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
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search by event name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <div className="filter-label">
              <i className="fas fa-filter"></i> Filter by Category:
            </div>
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  <i className={categoryIcons[category]}></i>
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
              <i className="fas fa-calendar-alt"></i> Upcoming Events
            </h2>
            <p className="section-subtitle">
              {loading ? 'Loading...' : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'} available`}
            </p>
          </div>
          
          {loading ? (
            <div className="spinner"></div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-events">
              <i className="fas fa-search no-events-icon"></i>
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
