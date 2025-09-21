'use client';

import React, { useState, useEffect } from 'react';

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const deadline = new Date('2025-09-20T23:59:59').getTime();

    // Calculate initial time immediately
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Set initial time immediately
    setTimeLeft(calculateTimeLeft());

    // Then set up the interval for updates
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl mb-8">
      <h4 className="text-2xl font-bold text-center mb-4">Applications Close In:</h4>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-sm opacity-90">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm opacity-90">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm opacity-90">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-sm opacity-90">Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  // State variables to hold the form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // State to manage the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Google Apps Script endpoint
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzvpa0kUiO5HW-BV-vOCh8ZDeTmIHH2IN8QRYfHQAyc2TqfDluTrvZIXrJUKzVa9hzT6Q/exec';

  // Application form URL
  const applicationFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_brbuCJu9sFJd0GCBAIL67axhrAd2R9yey2A2Lebx1nwHug/viewform';

  // Check if applications are closed
  const isApplicationsClosed = () => {
    const deadline = new Date('2025-09-20T23:59:59').getTime();
    const now = new Date().getTime();
    return now >= deadline;
  };

  /**
   * Handles the form submission event.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Simple validation
    if (!firstName || !lastName || !email) {
        setSubmitMessage('Please fill out all required fields.');
        setIsError(true);
        return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setSubmitMessage('');

    const formData = {
      firstName,
      lastName,
      email,
    };

    try {
      // Send the form data to the Google Apps Script web app
      await fetch(googleAppsScriptUrl, {
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
      setSubmitMessage('Success! You have been added to the mailing list.');
      // Reset form fields after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');

    } catch (error) {
      // Handle network errors or other issues with the fetch call
      console.error('Submission Error:', error);
      setIsSubmitting(false);
      setIsError(true);
      setSubmitMessage('An error occurred. Please try again later.');
    }
  };

  const applicationsClosed = isApplicationsClosed();

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">Apply Now!</h3>
          
          {applicationsClosed ? (
            <>
              <p className="text-xl text-gray-600 mb-4">
                Applications for the Fall 2025 semester are now closed.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your interest! Applications closed on Saturday, September 27th, 2025. We will review all submissions and contact selected applicants for interviews.
              </p>
            </>
          ) : (
            <>
              <p className="text-xl text-gray-600 mb-4">
                Applications for the Fall 2025 semester are now open!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Applications close on Saturday, September 20th, 2025 at 11:59 PM. Afterward, we will review applications and invite selected applicants to interview.
              </p>
              
              {/* Countdown Timer */}
              <CountdownTimer />
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Application CTA */}
          <div className="">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
              <h4 className="text-2xl font-bold text-red-800 mb-4">
                {applicationsClosed ? 'Applications Closed' : 'Ready to Join?'}
              </h4>
              <p className="text-red-700 mb-6">
                {applicationsClosed 
                  ? 'Applications for this semester are now closed. Please check back for future opportunities.'
                  : 'Click below to access our application form and take the first step toward impactful economic research.'
                }
              </p>
              {!applicationsClosed && (
                <a 
                  href={applicationFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 w-full"
                >
                  Apply Here
                </a>
              )}
            </div>
          </div>
          
          {/* Mailing List */}
          <div className="">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mailing List</h4>
              <p className="text-gray-600 mb-6">Stay updated on application openings, events, and important news.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {submitMessage && (
                  <p className={`mt-4 text-md text-center font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Need to unsubscribe?{' '}
                  <a href="/unsubscribe" className="text-red-600 hover:text-red-700 font-medium underline">
                    Click here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 