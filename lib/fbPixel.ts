// We need to use dynamic imports for react-facebook-pixel since it references window
// This approach ensures the module only loads in the browser
import CryptoJS from 'crypto-js';

const PIXEL_ID = '1202894657750071';

const options = {
  autoConfig: true,
  debug: false,
};

// Function to hash data using SHA-256
const hashData = (data: string): string => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

// Function to normalize and hash email
const hashEmail = (email: string): string => {
  const normalizedEmail = email.trim().toLowerCase();
  return hashData(normalizedEmail);
};

// Function to normalize and hash phone number
// Removes all non-digit characters
const hashPhoneNumber = (phone: string): string => {
  const normalizedPhone = phone.replace(/\D/g, '');
  return hashData(normalizedPhone);
};

// Function to normalize and hash name components
const hashNameComponent = (namePart: string): string => {
  const normalizedNamePart = namePart.trim().toLowerCase();
  return hashData(normalizedNamePart);
};

// Safe implementation that works on both server and client
export const initFacebookPixel = async () => {
  if (typeof window !== 'undefined') {
    try {
      const ReactPixel = (await import('react-facebook-pixel')).default;
      ReactPixel.init(PIXEL_ID, undefined, options);
      return ReactPixel;
    } catch (error) {
      console.error('Error initializing Facebook Pixel:', error);
    }
  }
  return null;
};

export const trackPageView = async () => {
  if (typeof window !== 'undefined') {
    try {
      const ReactPixel = (await import('react-facebook-pixel')).default;
      ReactPixel.pageView();
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }
};

interface UserData {
  em?: string; // Email
  ph?: string; // Phone number
  fn?: string; // First name
  ln?: string; // Last name
  // Add other fields as needed, e.g., ge (gender), db (date of birth), ct (city), st (state), zp (zip)
}

export const trackEvent = async (
  event: string,
  data?: object,
  userDataInput?: { name: string; email: string; phone: string },
  opts?: { fbc?: string; fbp?: string }
) => {
  if (typeof window !== 'undefined') {
    try {
      const ReactPixel = (await import('react-facebook-pixel')).default;
      
      let userDataForPixel: UserData = {};
      if (userDataInput) {
        if (userDataInput.email) {
          userDataForPixel.em = hashEmail(userDataInput.email);
        }
        if (userDataInput.phone) {
          userDataForPixel.ph = hashPhoneNumber(userDataInput.phone);
        }
        if (userDataInput.name) {
          const nameParts = userDataInput.name.trim().split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
          if (firstName) {
            userDataForPixel.fn = hashNameComponent(firstName);
          }
          if (lastName) {
            userDataForPixel.ln = hashNameComponent(lastName);
          }
        }
      }

      const eventPayload: Record<string, any> = { ...data, user_data: { ...userDataForPixel } };
      if (opts?.fbc) {
        eventPayload.user_data.fbc = opts.fbc;
      }
      if (opts?.fbp) {
        eventPayload.user_data.fbp = opts.fbp;
      }

      ReactPixel.track(event, eventPayload);
    } catch (error) {
      console.error(`Error tracking event ${event}:`, error);
    }
  }
};

export const trackPurchase = async (
  userDataInput: { name: string; email: string; phone: string },
  opts?: { fbc?: string; fbp?: string }
) => {
  if (typeof window !== 'undefined') {
    try {
      const ReactPixel = (await import('react-facebook-pixel')).default;
      
      // Import centralized utilities for consistency with CAPI
      const { prepareHashedUserData, PURCHASE_CONFIG } = await import('./fbUtils');
      
      const userDataForPixel = prepareHashedUserData(userDataInput);

      const eventPayload: Record<string, any> = {
        ...PURCHASE_CONFIG,
        user_data: { ...userDataForPixel },
        action_source: 'website',
        event_time: Math.floor(Date.now() / 1000),
      };

      if (opts?.fbc) {
        eventPayload.user_data.fbc = opts.fbc;
      }
      if (opts?.fbp) {
        eventPayload.user_data.fbp = opts.fbp;
      }

      ReactPixel.track('Purchase', eventPayload);
      
      console.log('Facebook Pixel Purchase event fired');
    } catch (error) {
      console.error('Error tracking purchase:', error);
    }
  }
}; 
