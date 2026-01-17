/**
 * OD2 Privacy-First Analytics Utility
 * 100% Client-Side, Event-Based, No QR Payload Tracking
 */

const ANALYTICS_CONFIG = {
  enabled: true,
  providers: {
    googleAnalytics: false, // Set via env or config
    plausible: false,
    umami: false,
    vercel: true, // Defaulting to Vercel if available
    cloudfare: false,
    selfHosted: false,
  },
  disableTracking: false, // Global toggle
};

export const trackEvent = (eventName, data = {}) => {
  if (ANALYTICS_CONFIG.disableTracking || !ANALYTICS_CONFIG.enabled) return;

  // Sanitize data - ensure no sensitive info is passed
  const sanitizedData = {
    ...data,
    timestamp: new Date().toISOString(),
    // Explicitly exclude any content fields if they accidentally leak
    content: undefined,
    payload: undefined,
    url: data.is_page_view ? data.url : undefined, // Only track URL if it's a page view
  };

  // 1. Console (for dev)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event]: ${eventName}`, sanitizedData);
  }

  // 2. Vercel Analytics (Generic example)
  if (ANALYTICS_CONFIG.providers.vercel && typeof window !== 'undefined' && window.va) {
    window.va('event', eventName, sanitizedData);
  }

  // 3. Custom Implementation (Internal event tracking if needed)
  // This could be a call to an internal API that just increments counters
};

export const trackQRGeneration = (qrType, customizations = {}) => {
  trackEvent('qr_generated', {
    type: qrType,
    has_logo: !!customizations.logo,
    has_gradient: !!customizations.gradient,
    error_correction: customizations.level || 'M',
    device_type: getDeviceType(),
    browser: getCoarseBrowser(),
  });
};

export const trackQRExport = (format, size) => {
  trackEvent('qr_exported', {
    format,
    size,
    device_type: getDeviceType(),
  });
};

const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getCoarseBrowser = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
};
