import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase/firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../config/cloudinary';
import './CreateEvent.css';

const EditEvent = () => {
  const { id } = useParams();
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingEvent, setFetchingEvent] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    totalTickets: '',
    category: 'Technology',
    image: '',
    newImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchEvent = useCallback(async () => {
    try {
      const eventDoc = await getDoc(doc(db, 'events', id));
      if (eventDoc.exists()) {
        const data = eventDoc.data();
        setFormData({
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
          price: data.price.toString(),
          totalTickets: data.totalTickets.toString(),
          category: data.category,
          image: data.image || '',
          newImage: null
        });
        setImagePreview(data.image || null);
      } else {
        alert('Event not found');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to load event');
    } finally {
      setFetchingEvent(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        newImage: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.date || !formData.time || 
        !formData.location || !formData.price || !formData.totalTickets) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      let imageUrl = formData.image; // Keep existing image by default

      // If new image is uploaded, upload it to Cloudinary
      if (formData.newImage) {
        imageUrl = await uploadToCloudinary(formData.newImage);
      }

      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        price: parseInt(formData.price),
        totalTickets: parseInt(formData.totalTickets),
        category: formData.category,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'events', id), eventData);
      
      alert('Event updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== 'organizer') {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Only organizers can edit events.</p>
      </div>
    );
  }

  if (fetchingEvent) {
    return (
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="create-event">
      <div className="container">
        <div className="create-event-header">
          <h1 className="page-title">
            <i className="fas fa-edit"></i> Edit Event
          </h1>
          <p className="page-subtitle">Update event details</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>
                <i className="fas fa-heading"></i> Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Tech Conference 2026"
                className="form-input"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>
                <i className="fas fa-align-left"></i> Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                className="form-textarea"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-calendar-alt"></i> Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-clock"></i> Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>
                <i className="fas fa-map-marker-alt"></i> Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Convention Center, New York"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-rupee-sign"></i> Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 2500"
                className="form-input"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-ticket-alt"></i> Total Tickets *
              </label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                placeholder="e.g., 500"
                className="form-input"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-tag"></i> Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Business">Business</option>
                <option value="Art">Art</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>
                <i className="fas fa-image"></i> Event Image
              </label>
              <input
                type="file"
                name="newImage"
                onChange={handleImageChange}
                accept="image/*"
                className="form-input"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Event preview" style={{
                    width: '200px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginTop: '10px'
                  }} />
                </div>
              )}
              <small className="form-hint">Upload a new image to replace the current one (optional)</small>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              disabled={loading}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <><i className="fas fa-spinner fa-spin"></i> Updating...</>
              ) : (
                <><i className="fas fa-check"></i> Update Event</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
