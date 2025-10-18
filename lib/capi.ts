import * as bizSdk from 'facebook-nodejs-business-sdk';

const accessToken = process.env.FB_ACCESS_TOKEN;
const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

if (!accessToken || !pixelId) {
  console.error('Facebook Access Token or Pixel ID is not set in environment variables. CAPI functionality will be limited.');
}

// Initialize FacebookAdsApi only if accessToken is available
const api = accessToken ? bizSdk.FacebookAdsApi.init(accessToken) : null;

const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;


interface PurchaseEventData {
  value: number;
  currency: string;
  content_type: string;
  content_ids: string[];
  num_items: number;
  userData: { 
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  };
  eventId: string;
  fbc?: string; // Facebook Click ID
  fbp?: string; // Facebook Browser ID
  clientIpAddress?: string; // Client IP address
  clientUserAgent?: string; // Client User Agent
}

export const sendPurchaseEventToCAPI = async (data: PurchaseEventData) => {
  if (!accessToken || !pixelId) {
    console.error('CAPI call skipped: Missing Facebook Access Token or Pixel ID.');
    return;
  }

  try {
    const userData = new UserData()
      .setExternalId(data.userData.em ? data.userData.em : '') // Using hashed email as external_id
      .setEmail(data.userData.em ? data.userData.em : '')
      .setPhone(data.userData.ph ? data.userData.ph : '')
      .setFirstName(data.userData.fn ? data.userData.fn : '')
      .setLastName(data.userData.ln ? data.userData.ln : '');

    // Set additional parameters for deduplication and matching on userData
    if (data.fbc) {
      userData.setFbc(data.fbc);
    }
    if (data.fbp) {
      userData.setFbp(data.fbp);
    }
    if (data.clientIpAddress) {
      userData.setClientIpAddress(data.clientIpAddress);
    }
    if (data.clientUserAgent) {
      userData.setClientUserAgent(data.clientUserAgent);
    }

    const content = new Content(
      data.content_ids[0],
      data.num_items,
      data.value
    );

    const customData = new CustomData()
      .setValue(data.value)
      .setCurrency(data.currency)
      .setContentType(data.content_type)
      .setContents([content]);

    const serverEvent = new ServerEvent()
      .setEventName('Purchase')
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl('https://vibeacademy.app/payment/success') // Replace with your actual success page URL
      .setActionSource('website')
      .setEventId(data.eventId);
    
    const events = [serverEvent];
    const eventRequest = new EventRequest(accessToken, pixelId).setEvents(events);

    await eventRequest.execute();
    console.log('CAPI Purchase event sent successfully!');
  } catch (error) {
    console.error('Error sending CAPI Purchase event:', error);
  }
};
