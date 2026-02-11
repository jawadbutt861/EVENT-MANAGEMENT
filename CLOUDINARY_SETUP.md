# Cloudinary Setup Instructions

## Important: Upload Preset Configuration

To make image uploads work, you need to create an **unsigned upload preset** in your Cloudinary dashboard:

### Steps to Create Upload Preset:

1. **Login to Cloudinary Dashboard**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Login with your account

2. **Navigate to Upload Settings**
   - Go to Settings → Upload
   - Click on "Add upload preset"

3. **Create Upload Preset**
   - **Preset name**: `event_images`
   - **Signing Mode**: Select "Unsigned"
   - **Folder**: `events/` (optional, for organization)
   - **Access Mode**: Public read
   - **Resource Type**: Image

4. **Save the Preset**
   - Click "Save"

### Current Configuration:
- **Cloud Name**: dhqctdrhtap
- **API Key**: 678784814319173
- **Upload Preset**: event_images (must be created as unsigned)

### Security Note:
The API Secret is included in the config but not used for unsigned uploads. For production, consider using signed uploads with backend processing.

### Features:
- ✅ Direct browser uploads to Cloudinary
- ✅ No Firebase Storage dependency
- ✅ Automatic image optimization
- ✅ CDN delivery
- ✅ Image transformations available

### Troubleshooting:
If uploads fail, check:
1. Upload preset `event_images` exists and is unsigned
2. Cloud name is correct
3. Network connectivity
4. File size limits (default 10MB for free accounts)