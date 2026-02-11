// CORS helper utilities for API calls

// Default headers for CORS requests
export const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Fetch wrapper with CORS support
export const corsEnabledFetch = async (url, options = {}) => {
  const defaultOptions = {
    mode: 'cors',
    headers: {
      ...corsHeaders,
      ...options.headers
    }
  };

  return fetch(url, { ...defaultOptions, ...options });
};

// Handle preflight OPTIONS requests
export const handleCorsPreflightResponse = (response) => {
  if (response.status === 200 || response.status === 204) {
    return response;
  }
  throw new Error(`CORS preflight failed with status: ${response.status}`);
};