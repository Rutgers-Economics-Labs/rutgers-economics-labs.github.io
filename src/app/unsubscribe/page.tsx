'use client';

import React, { useState } from 'react';

export default function UnsubscribePage() {
  // State variables to hold the form input values
  const [email, setEmail] = useState('');
  
  // State to manage the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Google Apps Script endpoint (same as the apply page)
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzvpa0kUiO5HW-BV-vOCh8ZDeTmIHH2IN8QRYfHQAyc2TqfDluTrvZIXrJUKzVa9hzT6Q/exec';

  /**
   * Handles the unsubscribe form submission event.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Simple validation
    if (!email) {
        setSubmitMessage('Please enter your email address.');
        setIsError(true);
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setSubmitMessage('Please enter a valid email address.');
        setIsError(true);
        return;
    }

    // Confirm unsubscribe action
    if (!window.confirm('Are you sure you want to unsubscribe? You will no longer receive updates about application openings, events, and important news.')) {
        return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setSubmitMessage('');

    const formData = {
      email,
      unsubscribe: true, // This flag tells the Apps Script to unsubscribe the user
    };

    try {
      // Send the form data to the Google Apps Script web app
      const response = await fetch(googleAppsScriptUrl, {
        method: 'POST',
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      // If the fetch call completes without a network error, we assume success
      setIsSubmitting(false);
      setIsError(false);
      setSubmitMessage('Success! You have been unsubscribed from our mailing list. You will no longer receive emails from us.');
      // Reset form field after successful submission
      setEmail('');

    } catch (error) {
      // Handle network errors or other issues with the fetch call
      console.error('Unsubscribe Error:', error);
      setIsSubmitting(false);
      setIsError(true);
      setSubmitMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">Unsubscribe</h3>
          <p className="text-xl text-gray-600 mb-4">
            We're sorry to see you go!
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Enter your email address below to unsubscribe from our mailing list. You'll no longer receive updates about application openings, events, and important news.
          </p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Unsubscribe from Mailing List</h4>
          <p className="text-gray-600 mb-6 text-center">Enter the email address you used to subscribe.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                disabled={isSubmitting}
                placeholder="Enter your email address"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium disabled:bg-red-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Unsubscribing...' : 'Unsubscribe'}
            </button>
            
            {submitMessage && (
              <p className={`mt-4 text-md text-center font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                {submitMessage}
              </p>
            )}
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Changed your mind? You can always{' '}
              <a href="/apply" className="text-red-600 hover:text-red-700 font-medium underline">
                re-subscribe here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
