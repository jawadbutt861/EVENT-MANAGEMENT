# 🔒 Firebase Security Rules

## Firestore Rules

To secure your Firestore database, add these rules in Firebase Console:

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `event-14a16`
3. Go to Firestore Database → Rules
4. Replace with the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      // Users can read their own bookings
      allow read: if request.auth != null && 
                     (request.auth.uid == resource.data.userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'organizer');
      
      // Users can create bookings for themselves
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
      
      // Only organizers can update bookings (for validation)
      allow update: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'organizer';
      
      // Users can delete their own bookings
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
  }
}
```

## Firebase Authentication Setup

1. Go to Firebase Console → Authentication
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Click "Email/Password" → Enable → Save

## Storage Rules (Optional - for future image uploads)

If you want to add event image uploads later:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /events/{eventId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'organizer';
    }
    
    match /tickets/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Testing Rules

After setting up rules, test them:

1. **Test as Attendee**:
   - Should be able to create bookings
   - Should see only their own tickets
   - Should NOT be able to update ticket status

2. **Test as Organizer**:
   - Should see all bookings
   - Should be able to update ticket status
   - Should access dashboard

3. **Test as Unauthenticated**:
   - Should NOT access any data
   - Should be redirected to login

## Important Notes

⚠️ **Security Best Practices**:
- Never expose Firebase config in public repos (use environment variables in production)
- Always validate data on the backend
- Use Firebase Security Rules as first line of defense
- Regularly audit your rules
- Enable App Check for additional security

## Firestore Indexes

For better query performance, create these indexes:

1. Go to Firestore → Indexes
2. Create composite index:
   - Collection: `bookings`
   - Fields: `userId` (Ascending), `eventId` (Ascending)
   - Query scope: Collection

Firebase will automatically prompt you to create indexes when needed.

## Backup Strategy

1. Go to Firestore → Backups
2. Enable automated backups
3. Set retention period (recommended: 7 days)

## Monitoring

1. Go to Firebase Console → Analytics
2. Enable Google Analytics
3. Monitor:
   - Active users
   - Authentication events
   - Database reads/writes
   - Error rates

---

**Security Checklist**:
- [x] Firestore rules configured
- [x] Authentication enabled
- [x] Email/Password provider enabled
- [ ] App Check enabled (optional)
- [ ] Automated backups enabled (optional)
- [ ] Analytics configured (optional)
