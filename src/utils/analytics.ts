// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Send a custom event to Google Analytics
 * @param eventName - The name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track a page view
 * @param pageTitle - The title of the page
 * @param pagePath - The path of the page
 */
export const trackPageView = (pageTitle: string, pagePath?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath || window.location.pathname,
    });
  }
};

/**
 * Track a custom conversion event
 * @param conversionName - The name of the conversion
 * @param value - Optional value for the conversion
 */
export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionName,
      value: value,
    });
  }
};
