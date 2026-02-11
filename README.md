# 🎫 Eventify - Event Management & Ticketing System

A modern, full-featured event management and ticketing platform with a futuristic cyberpunk theme. Built with React, Firebase, and Cloudinary.

![Theme](https://img.shields.io/badge/Theme-Cyberpunk-00F5D4)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## ✨ Features

### For Attendees
- 🎟️ Browse and search events by category
- 🔍 Advanced search and filtering
- 🎫 Book tickets (max 2 per event)
- 📱 QR code tickets with download
- 💳 View booking history
- ⚡ Real-time ticket availability

### For Organizers
- 📊 Comprehensive dashboard with statistics
- ➕ Create new events with image upload
- ✏️ Edit existing events
- 🗑️ Delete events (with protection)
- 👥 View attendee lists
- ✅ Validate tickets manually
- 📈 Track sales and revenue
- 🗓️ Auto-remove expired events

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0, React Router DOM
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **Icons**: Font Awesome
- **QR Codes**: qrcode.react
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd eventify
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:5173
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set security rules (see `FIREBASE_RULES.md`)

### Cloudinary Setup
1. Create Cloudinary account
2. Create unsigned upload preset named `event_images`
3. Add credentials to `.env` file

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx   # Error handling
│   ├── EventCard.jsx       # Event card component
│   ├── Logo.jsx           # Custom SVG logo
│   └── Navbar.jsx         # Navigation
├── pages/
│   ├── Home.jsx           # Event listing
│   ├── Login.jsx          # Authentication
│   ├── Signup.jsx         # Registration
│   ├── EventDetails.jsx   # Event details & booking
│   ├── MyTickets.jsx      # User tickets with QR
│   ├── Dashboard.jsx      # Organizer dashboard
│   ├── CreateEvent.jsx    # Create new event
│   ├── EditEvent.jsx      # Edit event
│   └── ManageEvents.jsx   # Manage all events
├── context/
│   └── AuthContext.jsx    # Authentication state
├── config/
│   ├── firebase/          # Firebase configuration
│   └── cloudinary.js      # Cloudinary configuration
├── constants/
│   └── index.js           # App constants
├── utils/
│   └── errorHandler.js    # Error handling utilities
└── assets/                # Static assets
```

## 🔐 Security Features

- ✅ Environment variables for sensitive data
- ✅ Firebase security rules
- ✅ Input validation and sanitization
- ✅ Error boundary for crash protection
- ✅ CORS configuration
- ✅ Role-based access control
- ✅ Protected routes

## ♿ Accessibility Features

- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Semantic HTML structure
- ✅ Color contrast compliance
- ✅ Focus management

## 🎨 Design System

### Color Palette
```css
--primary: #00F5D4        /* Neon Cyan */
--secondary: #7C3AED      /* Electric Purple */
--success: #2DD4BF        /* Teal */
--error: #F43F5E          /* Rose */
--warning: #FACC15        /* Yellow */
--dark: #020617           /* Deep Black */
--light: #0F172A          /* Dark Navy */
--background: #0F172A     /* Dark Navy */
```

### UI Features
- Cyberpunk/Futuristic theme
- Glassmorphism effects
- Neon glow animations
- Responsive grid layouts
- Card-based design
- Smooth transitions

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🧪 Testing Checklist

- [ ] User authentication (login/signup)
- [ ] Event browsing and search
- [ ] Event creation with image upload
- [ ] Ticket booking system
- [ ] QR code generation
- [ ] Organizer dashboard
- [ ] Ticket validation
- [ ] Responsive design
- [ ] Error handling
- [ ] Accessibility features

## 🐛 Troubleshooting

### Common Issues

**Environment Variables Not Loading**
- Ensure `.env` file is in root directory
- Restart development server after changes

**Cloudinary Upload Fails**
- Check upload preset exists and is unsigned
- Verify cloud name and credentials

**Firebase Connection Issues**
- Verify Firebase configuration
- Check Firestore security rules

**Console Errors**
- Check browser console for specific errors
- Verify all dependencies are installed

## 📚 Documentation

- `README.md` - This file
- `SETUP_GUIDE.md` - Step-by-step setup
- `DEPLOYMENT.md` - Deployment instructions
- `FIREBASE_RULES.md` - Security rules
- `CLOUDINARY_SETUP.md` - Cloudinary configuration
- `IMPORTANT_NOTES.md` - Tips and troubleshooting

## 🔄 Recent Updates (v2.0.0)

### 🛡️ Security Improvements
- ✅ Moved API keys to environment variables
- ✅ Added comprehensive error handling
- ✅ Implemented Error Boundary component
- ✅ Enhanced input validation

### 🚀 Performance Optimizations
- ✅ Memoized expensive computations
- ✅ Optimized re-renders with useCallback
- ✅ Lazy loading for images
- ✅ Removed unused code and dependencies

### ♿ Accessibility Enhancements
- ✅ Added ARIA labels and roles
- ✅ Improved keyboard navigation
- ✅ Enhanced screen reader support
- ✅ Better form label associations

### 🧹 Code Quality
- ✅ Added PropTypes validation
- ✅ Centralized constants and error messages
- ✅ Improved error handling patterns
- ✅ Fixed all ESLint warnings
- ✅ Removed disabled linting rules

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React + Firebase + Cloudinary**

**Theme**: Cyberpunk/Futuristic 🌟
**Version**: 2.0.0
**Status**: ✅ Production Ready
