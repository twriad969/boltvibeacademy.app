/**
 * CENTRALIZED FACEBOOK TRACKING UTILITIES
 * 
 * This module ensures consistency between Facebook Pixel (client-side) and CAPI (server-side):
 * 
 * KEY BENEFITS:
 * 1. Identical hashing algorithms for user data across Pixel and CAPI
 * 2. Consistent purchase configuration (value, currency, content_ids)
 * 3. Centralized event ID generation for deduplication
 * 
 * DEDUPLICATION STRATEGY:
 * - Same event_id format used by both Pixel and CAPI
 * - Facebook automatically deduplicates events with identical event_id
 * - Consistent user data hashing ensures proper event matching
 * 
 * USAGE:
 * - Import these utilities in both client-side (Pixel) and server-side (CAPI) code
 * - Never modify hashing logic without updating both implementations
 */
import CryptoJS from 'crypto-js';

// Function to hash data using SHA-256
export const hashData = (data: string): string => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

// Function to normalize and hash email
export const hashEmail = (email: string): string => {
  const normalizedEmail = email.trim().toLowerCase();
  return hashData(normalizedEmail);
};

// Function to normalize and hash phone number (removes all non-digit characters)
export const hashPhoneNumber = (phone: string): string => {
  const normalizedPhone = phone.replace(/\D/g, '');
  return hashData(normalizedPhone);
};

// Function to normalize and hash name components
export const hashNameComponent = (namePart: string): string => {
  const normalizedNamePart = namePart.trim().toLowerCase();
  return hashData(normalizedNamePart);
};

export interface UserDetails {
  name: string;
  email: string;
  phone?: string;
}

/**
 * Prepares hashed user data for Facebook CAPI/Pixel
 * Returns consistently hashed user data object
 */
export const prepareHashedUserData = (userDetails: UserDetails) => {
  const userData: any = {};
  
  if (userDetails.email) {
    userData.em = hashEmail(userDetails.email);
  }
  
  if (userDetails.phone) {
    userData.ph = hashPhoneNumber(userDetails.phone);
  }
  
  if (userDetails.name) {
    const nameParts = userDetails.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    if (firstName) {
      userData.fn = hashNameComponent(firstName);
    }
    if (lastName) {
      userData.ln = hashNameComponent(lastName);
    }
  }
  
  return userData;
};

/**
 * Generates a unique event ID for Facebook deduplication
 */
export const generateEventId = (invoiceId: string): string => {
  return `purchase_${invoiceId}`;
};

/**
 * Purchase event configuration
 */
export const PURCHASE_CONFIG = {
  value: 1500,
  currency: 'BDT',
  content_type: 'course',
  content_ids: ['N8NCOURSE1'],
  num_items: 1,
} as const;
