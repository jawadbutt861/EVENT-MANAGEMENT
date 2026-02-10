# 🚀 Deployment Guide

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Firebase rules configured
- [ ] Demo accounts created
- [ ] Build runs without errors: `npm run build`
- [ ] Preview build works: `npm run preview`

## Option 1: Deploy to Vercel (Recommended)

### Method A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **event-management**
   - Directory? **./dist**
   - Override settings? **N**

5. For production deployment:
```bash
vercel --prod
```

### Method B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

## Option 2: Deploy to Netlify

### Method A: Drag & Drop

1. Build your project:
```bash
npm run build
```

2. Go to https://app.netlify.com
3. Drag and drop the `dist` folder

### Method B: Using Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

### Method C: Connect Git Repository

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Option 3: Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

4. Configure:
   - What do you want to use as your public directory? **dist**
   - Configure as a single-page app? **Yes**
   - Set up automatic builds with GitHub? **No** (or Yes if you want)

5. Build your project:
```bash
npm run build
```

6. Deploy:
```bash
firebase deploy --only hosting
```

## Environment Variables (If Needed)

If you want to hide Firebase config in production:

1. Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `firebaseconfig.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

3. Add environment variables in your hosting platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Environment variables
   - **Firebase**: Not needed (same project)

## Post-Deployment Steps

1. **Test the deployed app**:
   - [ ] Can access the site
   - [ ] Login/Signup works
   - [ ] Can browse events
   - [ ] Can book tickets
   - [ ] QR codes generate
   - [ ] Dashboard accessible for organizers

2. **Update Firebase authorized domains**:
   - Go to Firebase Console → Authentication → Settings
   - Add your deployment domain to authorized domains

3. **Share your project**:
   - Add deployment link to README
   - Share with hackathon judges
   - Test on different devices

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

### Firebase
1. Go to Hosting → Add custom domain
2. Follow the verification steps

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Refresh
Add `_redirects` file in `public` folder:
```
/*    /index.html   200
```

Or for Vercel, create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Firebase Connection Issues
- Check if domain is authorized in Firebase Console
- Verify Firebase config is correct
- Check browser console for errors

## Performance Optimization

Before deploying:

1. **Optimize images**: Use WebP format
2. **Enable compression**: Most platforms do this automatically
3. **Add caching headers**: Configure in hosting platform
4. **Lazy load components**: Use React.lazy() for routes

## Monitoring

After deployment:

1. **Vercel**: Built-in analytics available
2. **Netlify**: Analytics in dashboard
3. **Firebase**: Use Firebase Analytics
4. **Google Analytics**: Add tracking code

---

## Quick Deploy Commands

```bash
# Build
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod

# Deploy to Firebase
firebase deploy --only hosting
```

**Your app is ready to go live! 🎉**
