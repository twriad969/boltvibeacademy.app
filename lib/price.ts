/**
 * CENTRALIZED PRICE CONFIGURATION
 * 
 * This file controls all prices across the application.
 * Change prices here and they will update everywhere:
 * - Checkout forms
 * - Facebook Pixel events (InitiateCheckout, Purchase)
 * - Facebook CAPI events
 * - Payment processing
 * - Display prices in UI
 * - Webhooks
 * 
 * USAGE:
 * Import { COURSE_PRICE } from '@/lib/price'
 * Use COURSE_PRICE.regular, COURSE_PRICE.original, etc.
 */

export const COURSE_PRICE = {
  // Regular course price (current offer price)
  regular: 1500,
  
  // Original price (before discount)
  original: 4500,
  
  // Special offer price (for vibeonlyoffer page)
  offer: 1000,
  
  // Currency code
  currency: 'BDT',
  
  // Formatted prices for display (Bangla)
  display: {
    regular: '৳1500',
    regularWithDecimals: '৳ 1500.00',
    original: '৳4500',
    offer: '৳1000',
  },
  
  // Content IDs for Facebook tracking
  contentIds: {
    regular: 'N8NCOURSE1',
    offer: 'N8NOFFERCOURSE1',
  },
  
  // Common tracking configuration
  tracking: {
    content_type: 'course',
    num_items: 1,
  }
} as const;

/**
 * Helper function to get Facebook event data for regular checkout
 */
export const getRegularCheckoutEventData = () => ({
  value: COURSE_PRICE.regular,
  currency: COURSE_PRICE.currency,
  content_type: COURSE_PRICE.tracking.content_type,
  content_ids: [COURSE_PRICE.contentIds.regular],
  num_items: COURSE_PRICE.tracking.num_items,
});

/**
 * Helper function to get Facebook event data for offer checkout
 */
export const getOfferCheckoutEventData = () => ({
  value: COURSE_PRICE.offer,
  currency: COURSE_PRICE.currency,
  content_type: COURSE_PRICE.tracking.content_type,
  content_ids: [COURSE_PRICE.contentIds.offer],
  num_items: COURSE_PRICE.tracking.num_items,
});

