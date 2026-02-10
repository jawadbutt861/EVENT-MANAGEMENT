# 🎫 Eventify - Event Management & Ticketing System

A modern, full-featured event management and ticketing platform with a futuristic cyberpunk theme. Built with React and Firebase.

![Theme](https://img.shields.io/badge/Theme-Cyberpunk-00F5D4)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28)

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
- ➕ Create new events
- ✏️ Edit existing events
- 🗑️ Delete events (with protection)
- 👥 View attendee lists
- ✅ Validate tickets manually
- 📈 Track sales and revenue
- 🗓️ Auto-remove expired events

## 🎨 Design

**Cyberpunk/Futuristic Theme**
- Neon Cyan (#00F5D4) - Primary
- Electric Purple (#7C3AED) - Secondary
- Dark Navy (#0F172A) - Background
- Deep Black (#020617) - Cards
- Neon glow effects and animations

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Icons**: Font Awesome
- **QR Codes**: qrcode.react
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

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

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:5173
```

## 🔥 Firebase Setup

### 1. Enable Authentication
- Go to Firebase Console → Authentication
- Enable Email/Password provider

### 2. Create Firestore Database
- Go to Firestore Database
- Create database in production mode

### 3. Set Security Rules
Copy rules from `FIREBASE_RULES.md` to Firestore Rules

### 4. Create Demo Accounts
- **Attendee**: Sign up normally
- **Organizer**: Create manually in Firebase Console (see `CREATE_ORGANIZER.md`)

## 📁 Project Structure

```
eventify/
├── src/
│   ├── components/
│   │   ├── Logo.jsx           # Custom SVG logo
│   │   ├── Navbar.jsx          # Navigation with active states
│   │   └── EventCard.jsx       # Event card component
│   ├── pages/
│   │   ├── Home.jsx            # Event listing
│   │   ├── Login.jsx           # Authentication
│   │   ├── Signup.jsx          # Registration
│   │   ├── EventDetails.jsx    # Event details & booking
│   │   ├── MyTickets.jsx       # User tickets with QR
│   │   ├── Dashboard.jsx       # Organizer dashboard
│   │   ├── CreateEvent.jsx     # Create new event
│   │   ├── EditEvent.jsx       # Edit event
│   │   └── ManageEvents.jsx    # Manage all events
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── config/
│   │   └── firebase/           # Firebase configuration
│   └── data/
│       └── events.js           # Static event data
├── public/
└── Documentation files
```

## 🎯 Key Features Explained

### Event Management
- Create, edit, and delete events
- Auto-remove expired events
- Protection against deleting events with bookings
- Real-time updates across all pages

### Ticket System
- Unique ticket ID generation
- QR code for each ticket
- Download tickets as images
- Ticket validation by organizers
- Status tracking (Valid/Used)

### User Roles
- **Attendee**: Book tickets, view QR codes
- **Organizer**: Manage events, validate tickets, view analytics

### Security
- Firebase Authentication
- Protected routes
- Role-based access control
- Firestore security rules

## 📱 Responsive Design

Fully responsive on:
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

## 🚀 Deployment

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

See `DEPLOYMENT.md` for detailed instructions.

## 📚 Documentation

- `README.md` - This file
- `SETUP_GUIDE.md` - Step-by-step setup
- `DEPLOYMENT.md` - Deployment instructions
- `FIREBASE_RULES.md` - Security rules
- `CREATE_ORGANIZER.md` - Create organizer accounts
- `IMPORTANT_NOTES.md` - Tips and troubleshooting
- `QUICK_REFERENCE.md` - Quick reference
- `UPDATES.md` - Version history
- `PROJECT_FEATURES.md` - Detailed features
- `NEW_COLOR_SCHEME.md` - Color scheme guide

## 🎨 Color Variables

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

## 🔒 Security Features

- Firebase Authentication
- Protected routes
- Role-based access
- Firestore security rules
- Input validation
- XSS prevention

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error**
- Check internet connection
- Verify Firebase config

**Can't Book Tickets**
- Ensure you're logged in
- Check ticket limit (max 2)

**Dashboard Not Accessible**
- Login with organizer account
- Check user role in Firestore

See `IMPORTANT_NOTES.md` for more solutions.

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a hackathon project. Feel free to fork and modify!

## 📞 Support

For issues or questions, create an issue in the repository.

---

**Built with ❤️ using React + Firebase**

**Theme**: Cyberpunk/Futuristic 🌟
**Version**: 1.4.0
**Status**: ✅ Production Ready


## 🌟 Features

### For Attendees
- ✅ Browse and search events by category
- ✅ View detailed event information
- ✅ Book tickets (max 2 per event)
- ✅ Generate QR code tickets
- ✅ Download tickets as images
- ✅ View all booked tickets in one place

### For Organizers
- ✅ Dashboard with event statistics
- ✅ View attendee lists per event
- ✅ Track ticket sales and revenue
- ✅ Validate tickets manually or via QR scan
- ✅ Real-time ticket status updates

### Core Logic Implemented
1. ✅ Prevent booking without login
2. ✅ Limit tickets per user (2 max per event)
3. ✅ Generate unique ticket IDs
4. ✅ Store bookings in Firestore
5. ✅ Show "Sold Out" when tickets finished
6. ✅ Disable booking after event date
7. ✅ Show total tickets booked counter
8. ✅ Ticket validation system

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **QR Codes**: qrcode.react
- **Styling**: Custom CSS with CSS Variables
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with glassmorphism
│   ├── Navbar.css
│   ├── EventCard.jsx       # Event card component
│   └── EventCard.css
├── pages/
│   ├── Home.jsx            # Event listing with search & filter
│   ├── Home.css
│   ├── Login.jsx           # User login
│   ├── Signup.jsx          # User registration
│   ├── Auth.css            # Shared auth styles
│   ├── EventDetails.jsx    # Event details & booking
│   ├── EventDetails.css
│   ├── MyTickets.jsx       # User tickets with QR codes
│   ├── MyTickets.css
│   ├── Dashboard.jsx       # Organizer dashboard
│   └── Dashboard.css
├── context/
│   └── AuthContext.jsx     # Authentication context
├── config/
│   └── firebase/
│       └── firebaseconfig.js
├── data/
│   └── events.js           # Event data
├── App.jsx                 # Main app with routing
├── App.css
├── main.jsx
└── index.css               # Global styles & variables
```

## 🎨 Design Features

### Color Palette
- **Primary**: Deep Indigo (#4F46E5)
- **Secondary**: Slate Gray (#64748B)
- **Background**: Off-White (#F8FAFC)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

### UI Highlights
- Glassmorphism navbar with blur effect
- Gradient hero section
- Card-based layouts with hover effects
- Responsive grid system
- Physical ticket-style design for QR codes
- Color-coded status badges
- Smooth transitions and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd event-management
```

2. Install dependencies
```bash
npm install
```

3. Firebase is already configured in the project

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 👥 Demo Credentials

### Attendee Account
- Email: `attendee@test.com`
- Password: `password123`

### Organizer Account
- Email: `organizer@test.com`
- Password: `password123`

**Note**: You need to create these accounts first by signing up, or create your own accounts.

## 📱 User Flows

### Attendee Flow
1. Sign up / Login
2. Browse events on home page
3. Use search and category filters
4. Click on event to view details
5. Book ticket (max 2 per event)
6. View QR code ticket in "My Tickets"
7. Download ticket as image

### Organizer Flow
1. Sign up as organizer / Login
2. Access dashboard from navbar
3. Select event to manage
4. View statistics (tickets sold, revenue, etc.)
5. See attendee list with details
6. Validate tickets using ticket ID
7. Track checked-in users

## 🔥 Key Features Explained

### Authentication
- Firebase Authentication for secure login/signup
- Role-based access (Attendee/Organizer)
- Protected routes for authenticated users
- Persistent login sessions

### Ticket Booking
- Real-time availability checking
- Unique ticket ID generation
- Firestore database storage
- User ticket limit enforcement
- Event date validation

### QR Code System
- Unique QR code per ticket
- Downloadable as PNG image
- Scannable ticket validation
- Status tracking (Valid/Used)

### Organizer Dashboard
- Event selection dropdown
- Statistics cards with icons
- Attendee table with sorting
- Manual ticket validation
- Real-time data updates

## 🎯 Logic Implementation

1. **Prevent booking without login**: Protected routes redirect to login
2. **Ticket limit**: Checks user's existing bookings before allowing new ones
3. **Unique ticket ID**: Generated using timestamp + random string
4. **Persistent storage**: All bookings saved to Firestore
5. **Sold out detection**: Compares available vs total tickets
6. **Date validation**: Disables booking for past events
7. **Ticket counter**: Real-time count from Firestore
8. **Validation system**: Updates ticket status in database

## 📦 Build & Deploy

### Build for production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🧪 Testing

Test the following scenarios:
- [ ] User signup and login
- [ ] Browse and search events
- [ ] Book tickets (logged in)
- [ ] Booking prevention (not logged in)
- [ ] Ticket limit (max 2 per event)
- [ ] View tickets with QR codes
- [ ] Download QR code
- [ ] Organizer dashboard access
- [ ] View attendee list
- [ ] Validate tickets
- [ ] Sold out events
- [ ] Expired events

## 🎓 Learning Outcomes

This project demonstrates:
- React hooks (useState, useEffect, useContext)
- React Router for navigation
- Firebase Authentication
- Firestore database operations
- QR code generation
- Protected routes
- Role-based access control
- Responsive design
- CSS custom properties
- Component composition

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a hackathon project. Feel free to fork and modify for your own use!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the Hackathon**
