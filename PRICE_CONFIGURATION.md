# Price Configuration Guide

## Overview
All course prices are now centralized in `lib/price.ts`. Change prices in one place and they automatically update everywhere.

## How to Change Prices

### Edit `lib/price.ts`:

```typescript
export const COURSE_PRICE = {
  regular: 1500,        // ← Change regular course price here
  original: 4500,       // ← Change original price here
  offer: 1000,          // ← Change special offer price here
  currency: 'BDT',      // ← Change currency if needed
  // ...
}
```

## What Gets Updated Automatically

When you change prices in `lib/price.ts`, these update everywhere:

### ✅ CheckoutForm.tsx
- InitiateCheckout event value (Facebook Pixel)
- Payment amount sent to payment gateway
- Price display on page (৳1500)
- Original price (crossed out ৳4500)
- Button text ("পেমেন্ট করুন ৳ 1500.00")

### ✅ OfferCheckoutForm.tsx  
- InitiateCheckout event value (Facebook Pixel)
- Payment amount (offer price: ৳1000)
- Price display (৳1000)
- Original price crossed out (৳1500)

### ✅ MobileCheckoutButton.tsx
- Price display (1500৳)
- Original price (4500৳)

### ✅ Facebook Tracking (lib/fbUtils.ts)
- Purchase event value
- Content IDs
- Currency
- All pixel tracking

### ✅ Constants (lib/constants.ts)
- PRICING.amount
- PRICING.originalAmount

## Files Modified
1. ✅ `lib/price.ts` - **NEW** Centralized price configuration
2. ✅ `lib/fbUtils.ts` - Now imports from price.ts
3. ✅ `lib/constants.ts` - Now imports from price.ts
4. ✅ `components/CheckoutForm.tsx` - Uses COURSE_PRICE
5. ✅ `components/OfferCheckoutForm.tsx` - Uses COURSE_PRICE
6. ✅ `components/MobileCheckoutButton.tsx` - Uses COURSE_PRICE

## Example: Changing Price from 1500 to 2000

**Before:** Had to change in 15+ places across 6 files  
**Now:** Change ONE line in `lib/price.ts`:

```typescript
export const COURSE_PRICE = {
  regular: 2000,  // Changed from 1500
  // ...
}
```

That's it! Everything updates automatically:
- Checkout forms
- Payment gateway
- Facebook Pixel events
- Facebook CAPI events
- All price displays
- Webhooks

## Testing
After changing prices, test:
1. Checkout flow works
2. Payment amount is correct
3. Facebook events show correct value
4. UI displays updated prices

