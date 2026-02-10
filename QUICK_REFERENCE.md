# 🚀 Quick Reference Guide

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Demo Accounts

Create these accounts after starting the app:

**Attendee Account**
- Email: `attendee@test.com`
- Password: `password123`
- Role: Attendee

**Organizer Account**
- Email: `organizer@test.com`
- Password: `password123`
- Role: Organizer

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   └── EventCard.jsx   # Event card component
├── pages/              # Page components
│   ├── Home.jsx        # Event listing
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration
│   ├── EventDetails.jsx # Event details & booking
│   ├── MyTickets.jsx   # User tickets with QR
│   └── Dashboard.jsx   # Organizer dashboard
├── context/            # React Context
│   └── AuthContext.jsx # Authentication state
├── config/             # Configuration
│   └── firebase/       # Firebase config
├── data/               # Static data
│   └── events.js       # Event data
└── App.jsx             # Main app with routing
```

## 🎨 Color Variables

```css
--primary: #4F46E5        /* Deep Indigo */
--primary-dark: #4338CA   /* Darker Indigo */
--secondary: #64748B      /* Slate Gray */
--background: #F8FAFC     /* Off-White */
--success: #10B981        /* Green */
--error: #EF4444          /* Red */
--warning: #F59E0B        /* Orange */
```

## 🔥 Firebase Collections

### users
```javascript
{
  email: string,
  role: 'attendee' | 'organizer',
  createdAt: Date
}
```

### bookings
```javascript
{
  userId: string,
  userEmail: string,
  eventId: number,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  eventLocation: string,
  ticketId: string,
  price: number,
  bookingDate: string,
  status: 'valid' | 'used'
}
```

## 🛣️ Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with events |
| `/login` | Public | Login page |
| `/signup` | Public | Registration page |
| `/event/:id` | Public | Event details |
| `/my-tickets` | Protected | User's tickets |
| `/dashboard` | Organizer Only | Organizer dashboard |

## 🎯 Key Features

### Authentication
```javascript
import { useAuth } from './context/AuthContext';

const { currentUser, userRole, login, signup, logout } = useAuth();
```

### Booking Logic
- Max 2 tickets per user per event
- Checks available tickets
- Validates event date
- Requires authentication

### QR Code Generation
```javascript
import { QRCodeSVG } from 'qrcode.react';

<QRCodeSVG 
  value={ticketId} 
  size={180} 
  level="H" 
  includeMargin={true} 
/>
```

## 🐛 Common Issues & Solutions

### Issue: Firebase connection error
**Solution**: Check internet connection and Firebase config

### Issue: Can't book tickets
**Solution**: Make sure you're logged in and haven't reached the limit

### Issue: Dashboard not accessible
**Solution**: Login with an organizer account

### Issue: QR code not showing
**Solution**: Check if qrcode.react is installed: `npm install qrcode.react`

## 📱 Testing Checklist

- [ ] User can sign up
- [ ] User can login
- [ ] User can browse events
- [ ] User can search events
- [ ] User can filter by category
- [ ] User can view event details
- [ ] User can book tickets (when logged in)
- [ ] User cannot book without login
- [ ] User cannot book more than 2 tickets
- [ ] User cannot book sold out events
- [ ] User can view their tickets
- [ ] User can download QR code
- [ ] Organizer can access dashboard
- [ ] Organizer can view attendees
- [ ] Organizer can validate tickets
- [ ] Statistics update correctly

## 🚀 Deployment Commands

### Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

## 📊 Component Props

### EventCard
```javascript
<EventCard event={eventObject} />
// eventObject: { id, title, description, date, time, location, price, totalTickets, availableTickets, image, category }
```

## 🔒 Firebase Security Rules

```javascript
// Allow users to read their own bookings
// Allow organizers to read all bookings
// Allow users to create bookings
// Allow organizers to update bookings (validation)
```

See `FIREBASE_RULES.md` for complete rules.

## 💡 Tips

1. **Development**: Use `npm run dev` for hot reload
2. **Production**: Always test with `npm run build` before deploying
3. **Firebase**: Set up security rules before going live
4. **Testing**: Create multiple test accounts to test different scenarios
5. **Mobile**: Test on actual mobile devices, not just browser DevTools
6. **Performance**: Use React DevTools to check for unnecessary re-renders

## 📞 Support

- Check `README.md` for detailed documentation
- See `SETUP_GUIDE.md` for step-by-step setup
- Read `DEPLOYMENT.md` for deployment instructions
- Review `FIREBASE_RULES.md` for security setup

## 🎉 Quick Start (TL;DR)

```bash
# 1. Install
npm install

# 2. Start
npm run dev

# 3. Open browser
http://localhost:5173

# 4. Create accounts and test!
```

---

**Happy Coding! 🚀**
