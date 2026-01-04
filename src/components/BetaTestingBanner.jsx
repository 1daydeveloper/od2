'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * BetaTestingBanner Component
 * 
 * A lightweight, floating banner to promote beta testing for the Android Temp Mail app.
 * 
 * Features:
 * - Fixed position on desktop and mobile
 * - LocalStorage persistence (dismissal preference)
 * - Google Analytics 4 event tracking
 * - Accessible design with proper ARIA labels
 * - Smooth animations and responsive design
 * 
 * Analytics Events:
 * - banner_viewed: Fired when banner is displayed
 * - join_group_clicked: Fired when CTA button is clicked
 * - banner_closed: Fired when user dismisses the banner
 * 
 * All events include metadata:
 * - event_category: 'beta_testing'
 * - event_label: 'temp_mail_android'
 */

const BetaTestingBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Session storage key for dismissal preference
  // Using sessionStorage: banner is dismissed only for current session
  // On page reload or new session, banner shows again
  const STORAGE_KEY = 'od2_beta_banner_dismissed_session';
  const STORAGE_TIMESTAMP_KEY = 'od2_beta_banner_dismissed_time_session';

  // Check if banner has been dismissed and render on client only
  useEffect(() => {
    setIsClient(true);

    // Only proceed if running in browser
    if (typeof window === 'undefined') return;

    // Check if banner was previously dismissed in this session
    const isDismissed = sessionStorage.getItem(STORAGE_KEY);

    if (!isDismissed) {
      setIsVisible(true);

      // Track banner view event in GA4
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'banner_viewed', {
          event_category: 'beta_testing',
          event_label: 'temp_mail_android',
        });
      }
    }
  }, []);

  /**
   * Handle CTA button click
   * Tracks the event in GA4 and opens the link in a new tab
   */
  const handleCTAClick = () => {
    // Track CTA click event in GA4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'join_group_clicked', {
        event_category: 'beta_testing',
        event_label: 'temp_mail_android',
      });
    }

    // Open Google Groups link in new tab
    window.open(
      'https://groups.google.com/g/od2-testers',
      '_blank',
      'noopener,noreferrer'
    );
  };

  /**
   * Handle banner dismissal
   * Stores preference in sessionStorage (current session only)
   * Banner will show again on next page reload
   */
  const handleDismiss = () => {
    // Store dismissal preference in sessionStorage (session-only)
    sessionStorage.setItem(STORAGE_KEY, 'true');
    sessionStorage.setItem(STORAGE_TIMESTAMP_KEY, new Date().toISOString());

    // Track banner close event in GA4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'banner_closed', {
        event_category: 'beta_testing',
        event_label: 'temp_mail_android',
      });
    }

    // Hide banner
    setIsVisible(false);
  };

  // Only render if client-side and banner is visible
  if (!isClient || !isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="complementary"
      aria-label="Beta testing invitation"
    >
      {/* Banner container with gradient background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg shadow-2xl overflow-hidden border border-blue-500 dark:border-blue-600">
        {/* Animated background accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
        </div>

        {/* Content container */}
        <div className="relative p-4 sm:p-5">
          {/* Dismiss button - positioned in top right */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 rounded-full p-1"
            aria-label="Dismiss banner"
            title="Dismiss this banner"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Main content area */}
          <div className="pr-8">
            {/* Headline */}
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
              🚀 Join Our Beta Testing Program
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-100 mb-4">
              Be the first to try the new Android OD2 Temp Mail app. Help us shape the future of temporary email!
            </p>

            {/* CTA Button */}
            <button
              onClick={handleCTAClick}
              className="w-full bg-white text-blue-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 text-sm sm:text-base"
              aria-label="Join beta testing group"
            >
              Join Beta Testing →
            </button>
          </div>

          {/* Optional: Subtle footer text */}
          <div className="mt-3 text-xs text-blue-200">
            ✓ Limited spots available • Early access to new features
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaTestingBanner;
