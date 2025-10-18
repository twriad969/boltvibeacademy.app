'use client';

import { useEffect } from 'react';

export default function ReviewsPage() {
  useEffect(() => {
    // Redirect to the Google Form
    window.location.href = 'https://forms.gle/fb1KuzZniY3K6MRf6';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to reviews form...</p>
        <p className="text-sm text-gray-500 mt-2">
          If you are not redirected automatically, 
          <a 
            href="https://forms.gle/fb1KuzZniY3K6MRf6" 
            className="text-blue-600 hover:underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}