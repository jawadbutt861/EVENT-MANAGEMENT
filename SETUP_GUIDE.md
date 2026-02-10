# 🚀 Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Start Development Server
```bash
npm run dev
```

## Step 3: Create Demo Accounts

### Create Organizer Account
1. Open http://localhost:5173
2. Click "Sign Up"
3. Enter email: `organizer@test.com`
4. Enter password: `password123`
5. Select "Organizer (Manage Events)"
6. Click "Sign Up"

### Create Attendee Account
1. Logout from organizer account
2. Click "Sign Up"
3. Enter email: `attendee@test.com`
4. Enter password: `password123`
5. Select "Attendee (Book Tickets)"
6. Click "Sign Up"

## Step 4: Test the Application

### As Attendee:
1. Login with attendee@test.com
2. Browse events on home page
3. Click on any event
4. Click "Book Ticket Now"
5. Go to "My Tickets" to see your QR code
6. Try downloading the QR code

### As Organizer:
1. Login with organizer@test.com
2. Click "Dashboard" in navbar
3. Select an event from dropdown
4. View statistics and attendee list
5. Copy a ticket ID from the table
6. Paste it in the validator and click "Validate Ticket"

## 🎯 Features to Test

- ✅ Search events by name
- ✅ Filter by category
- ✅ Book multiple tickets (max 2 per event)
- ✅ Try booking without login (should redirect)
- ✅ Download QR code as image
- ✅ Validate tickets in organizer dashboard
- ✅ Check real-time statistics

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check your internet connection
- Verify Firebase config in `src/config/firebase/firebaseconfig.js`

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill the process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

## 📱 Mobile Testing

The app is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🚀 Deployment Checklist

Before deploying:
- [ ] Test all user flows
- [ ] Check responsive design
- [ ] Verify Firebase rules are set
- [ ] Test on different browsers
- [ ] Build production version: `npm run build`
- [ ] Test production build: `npm run preview`

## 🎉 You're All Set!

Your Event Management System is ready to use. Happy coding! 🚀
