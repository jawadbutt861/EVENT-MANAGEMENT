// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: 'dhqctdrhtap',
  apiKey: '678784814319173',
  apiSecret: '4M9Jz7VWr4eXbaTuPYSO0VSLun8',
  uploadPreset: 'event_images' // You'll need to create this in Cloudinary dashboard
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'event_images'); // Unsigned upload preset
  formData.append('cloud_name', cloudinaryConfig.cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
        mode: 'cors', // Enable CORS
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error:', errorData);
      throw new Error(`Failed to upload image: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};