import { ERROR_MESSAGES } from '../constants';

// Centralized error handling utility
export class ErrorHandler {
  static log(error, context = '') {
    if (import.meta.env.DEV) {
      console.error(`[${context}]`, error);
    }
    
    // In production, you might want to send errors to a logging service
    // Example: sendToLoggingService(error, context);
  }

  static getErrorMessage(error) {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return ERROR_MESSAGES.LOGIN_FAILED;
        case 'auth/email-already-in-use':
          return ERROR_MESSAGES.SIGNUP_FAILED;
        case 'auth/weak-password':
          return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
        case 'permission-denied':
          return ERROR_MESSAGES.ACCESS_DENIED;
        default:
          return error.message || 'An unexpected error occurred';
      }
    }

    return error?.message || 'An unexpected error occurred';
  }

  static async handleAsyncError(asyncFn, context = '', fallbackMessage = ERROR_MESSAGES.FETCH_FAILED) {
    try {
      return await asyncFn();
    } catch (error) {
      this.log(error, context);
      throw new Error(this.getErrorMessage(error) || fallbackMessage);
    }
  }

  static showError(error, context = '') {
    this.log(error, context);
    const message = this.getErrorMessage(error);
    
    // You can replace alert with a toast notification system
    alert(message);
  }

  static showSuccess(message) {
    // You can replace alert with a toast notification system
    alert(message);
  }
}

// Utility function for handling promises with error logging
export const handlePromise = async (promise, context = '') => {
  try {
    return await promise;
  } catch (error) {
    ErrorHandler.log(error, context);
    throw error;
  }
};