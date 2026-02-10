# 🔧 How to Create Organizer Account

Since signup is restricted to attendees only, organizer accounts must be created manually.

## Method 1: Using Firebase Console (Recommended)

### Step 1: Create User in Authentication
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `event-14a16`
3. Go to **Authentication** → **Users**
4. Click **Add User**
5. Enter:
   - Email: `organizer@test.com`
   - Password: `password123`
6. Click **Add User**

### Step 2: Add Role in Firestore
1. Go to **Firestore Database**
2. Go to **users** collection
3. Click **Add Document**
4. Document ID: Copy the UID from Authentication (the user you just created)
5. Add fields:
   ```
   email: organizer@test.com
   role: organizer
   createdAt: [Click "Add field" → Type: timestamp → Click "Set to current time"]
   ```
6. Click **Save**

### Step 3: Test
1. Go to your app
2. Login with `organizer@test.com` / `password123`
3. You should see "Dashboard" in navbar
4. Click Dashboard to access organizer features

---

## Method 2: Using Firebase CLI (Advanced)

If you have Firebase CLI installed:

```javascript
// Run this in Firebase Console → Firestore → Rules → Test
const admin = require('firebase-admin');

// Initialize admin SDK
admin.initializeApp();

// Create organizer
async function createOrganizer() {
  const userRecord = await admin.auth().createUser({
    email: 'organizer@test.com',
    password: 'password123'
  });

  await admin.firestore().collection('users').doc(userRecord.uid).set({
    email: 'organizer@test.com',
    role: 'organizer',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log('Organizer created:', userRecord.uid);
}

createOrganizer();
```

---

## Method 3: Temporary Signup Modification (For Testing Only)

If you need to quickly create an organizer for testing:

1. Temporarily modify `src/pages/Signup.jsx`:
   ```javascript
   // Change this line:
   await signup(email, password, 'attendee');
   
   // To:
   await signup(email, password, 'organizer');
   ```

2. Sign up with organizer credentials
3. **IMPORTANT**: Change it back to 'attendee' after creating the account!

---

## Pre-created Demo Organizer

For hackathon demo, you should have already created:
- Email: `organizer@test.com`
- Password: `password123`
- Role: organizer

If not, use Method 1 above.

---

## Why This Restriction?

### Security Reasons:
- ✅ Prevents unauthorized organizer access
- ✅ Admin controls who can manage events
- ✅ Better role management
- ✅ Production-ready approach

### Real-World Scenario:
In a real event management system:
- Regular users sign up as attendees
- Only authorized staff get organizer access
- Admin creates organizer accounts manually
- This prevents abuse and maintains security

---

## Multiple Organizers

To create multiple organizers, repeat Method 1 with different emails:
- `organizer1@test.com`
- `organizer2@test.com`
- `admin@test.com`

Each will have full organizer access.

---

## Troubleshooting

### Issue: Can't login as organizer
**Solution**: Make sure you added the role in Firestore, not just Authentication

### Issue: Organizer sees attendee features
**Solution**: Check Firestore → users → [user-id] → role field is "organizer"

### Issue: UID doesn't match
**Solution**: 
1. Go to Authentication → Copy exact UID
2. Go to Firestore → users → Use that exact UID as document ID

---

## Quick Checklist

Creating organizer account:
- [ ] Created user in Firebase Authentication
- [ ] Copied UID from Authentication
- [ ] Created document in Firestore users collection
- [ ] Used UID as document ID
- [ ] Added email field
- [ ] Added role field as "organizer"
- [ ] Added createdAt timestamp
- [ ] Tested login
- [ ] Verified Dashboard access

---

**Your organizer account is ready!** 🎉
