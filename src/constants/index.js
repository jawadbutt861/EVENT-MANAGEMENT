// Firebase Collections
export const COLLECTIONS = {
  EVENTS: 'events',
  BOOKINGS: 'bookings',
  USERS: 'users'
};

// User Roles
export const USER_ROLES = {
  ATTENDEE: 'attendee',
  ORGANIZER: 'organizer'
};

// Event Categories
export const EVENT_CATEGORIES = {
  TECHNOLOGY: 'Technology',
  MUSIC: 'Music',
  BUSINESS: 'Business',
  ART: 'Art',
  FOOD: 'Food',
  SPORTS: 'Sports',
  EDUCATION: 'Education'
};

// Category Icons
export const CATEGORY_ICONS = {
  'All': 'fas fa-th-large',
  'Technology': 'fas fa-laptop-code',
  'Music': 'fas fa-music',
  'Business': 'fas fa-briefcase',
  'Art': 'fas fa-palette',
  'Food': 'fas fa-utensils',
  'Sports': 'fas fa-dumbbell',
  'Education': 'fas fa-graduation-cap'
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  MAX_TICKETS_PER_USER: 2,
  MIN_PRICE: 0,
  MIN_TICKETS: 1
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Please fill in all required fields',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  LOGIN_FAILED: 'Failed to login. Check your credentials.',
  SIGNUP_FAILED: 'Failed to create account. Email may already be in use.',
  EVENT_CREATE_FAILED: 'Failed to create event. Please try again.',
  EVENT_UPDATE_FAILED: 'Failed to update event. Please try again.',
  IMAGE_UPLOAD_REQUIRED: 'Please fill in all required fields including event image',
  ACCESS_DENIED: 'Access Denied',
  ORGANIZER_ONLY: 'Only organizers can access this page.',
  MAX_TICKETS_EXCEEDED: `You can only book up to ${VALIDATION_RULES.MAX_TICKETS_PER_USER} tickets per event`,
  INSUFFICIENT_TICKETS: 'Not enough tickets available',
  BOOKING_FAILED: 'Failed to book tickets. Please try again.',
  EVENT_NOT_FOUND: 'Event not found',
  FETCH_FAILED: 'Failed to load data. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  EVENT_CREATED: 'Event created successfully!',
  EVENT_UPDATED: 'Event updated successfully!',
  TICKETS_BOOKED: 'Tickets booked successfully!',
  EVENT_DELETED: 'Event deleted successfully!'
};