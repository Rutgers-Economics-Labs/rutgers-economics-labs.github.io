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
    const deadline = new Date('2026-02-06T23:59:59').getTime();

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
  const applicationFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdHAChiYJsCOMYAyFnt7w7cN8_w-u0OI4M6EfN642CpciCHAA/viewform?usp=publish-editor';

  // Check if applications are closed
  const isApplicationsClosed = () => {
    const deadline = new Date('2026-02-06T23:59:59').getTime();
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
    <div className="py-20 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Apply Now!</h3>

          {applicationsClosed ? (
            <>
              <p className="text-xl text-[var(--text-secondary)] mb-4">
                Applications for the Spring 2026 semester are now closed.
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Thank you for your interest! Applications closed on Friday, February 6th, 2026. We will review all submissions and contact selected applicants for interviews.
              </p>
            </>
          ) : (
            <>
              <p className="text-xl text-[var(--text-secondary)] mb-4">
                Ready to dive into real-world economic research and make an impact? Join Rutgers Economics Labs!
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                REL offers undergraduate students the opportunity to produce economic research papers for government agencies, think tanks, and other public policy organizations using statistical and econometric methods.
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                Students work in teams of six over the course of the semester to write research papers for our partner organizations using tools such as Python and R. Papers include a literature review, statistical analysis, and interpretation of results.
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                <strong>Students from all majors are encouraged to apply</strong>, including but not limited to Economics, Data Science, Statistics, Computer Science, Public Policy, Political Science, Business Analytics, Finance, and Math. While no previous experience in economic research is required, <strong>a strong quantitative aptitude and comfort with data are essential</strong>.
              </p>
            </>
          )}
        </div>

        {/* Application Deadline Info */}
        {!applicationsClosed && (
          <div className="text-center mb-8">
            <p className="text-lg text-[var(--text-secondary)] mb-4">
              Applications are now open and will close on <strong>Friday, February 6 at 11:59 PM</strong>.*
            </p>
            <p className="text-sm text-[var(--text-muted)] italic">* Applications will be reviewed on a rolling basis</p>
            <div className="mt-6">
              <CountdownTimer />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Application CTA */}
          <div className="">
            <div className="bg-red-600/10 border border-red-600/20 p-8 rounded-2xl text-center">
              <h4 className="text-2xl font-bold text-red-500 mb-4">
                {applicationsClosed ? 'Applications Closed' : 'Ready to Join?'}
              </h4>
              <p className="text-red-400 mb-6">
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
            <div className="bg-[var(--bg-tertiary)] p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Join Our Mailing List</h4>
              <p className="text-[var(--text-secondary)] mb-6">Stay updated on application openings, events, and important news.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name *</label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-3 rounded-lg hover:opacity-80 transition-all duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
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
                <p className="text-[var(--text-muted)] text-sm">
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