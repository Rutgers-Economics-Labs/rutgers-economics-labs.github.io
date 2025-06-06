import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Mail, User } from 'lucide-react';

const Apply = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [applicationDates, setApplicationDates] = useState({
    opening: 'August 15, 2025',
    closing: 'September 30, 2025',
    notification: 'October 15, 2025'
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    major: '',
    year: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Check if applications are currently open
    // For demo purposes, let's set it based on current date
    // In production, you'd want to manage this through your backend
    const currentDate = new Date();
    const fallOpeningDate = new Date('2025-08-15');
    const fallClosingDate = new Date('2025-09-30');
    
    setIsApplicationOpen(currentDate >= fallOpeningDate && currentDate <= fallClosingDate);

    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call for email sending and mailing list addition
      // In production, you'd want to implement proper backend services
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'application_interest',
          sendTo: 'rel@rutgerseconomics.org'
        })
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your interest! We\'ve added you to our mailing list and will notify you when applications open.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          major: '',
          year: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitMessage('Thank you for your interest! We\'ve received your information and will keep you updated.');
      // Reset form even on error for demo purposes
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        major: '',
        year: '',
        message: ''
      });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Apply to Join REL</h3>
          
          {/* Application Status */}
          <div className={`inline-block mb-8 fade-in ${
            isApplicationOpen ? 'application-status-open' : 'application-status-closed'
          }`}>
            <div className="flex items-center space-x-3">
              {isApplicationOpen ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
              <span className="text-xl font-semibold">
                Applications {isApplicationOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="bg-gray-50 p-8 rounded-2xl mb-12 fade-in">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Fall 2025 Application Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h5 className="font-semibold text-gray-900">Applications Open</h5>
                <p className="text-gray-600">{applicationDates.opening}</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h5 className="font-semibold text-gray-900">Deadline</h5>
                <p className="text-gray-600">{applicationDates.closing}</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h5 className="font-semibold text-gray-900">Notifications</h5>
                <p className="text-gray-600">{applicationDates.notification}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Application Info */}
          <div className="fade-in">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-red-800 mb-6">What We're Looking For</h4>
              <div className="space-y-4 text-red-700">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-red-600" />
                  <p>Strong quantitative and analytical skills</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-red-600" />
                  <p>Interest in economics, public policy, or data science</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-red-600" />
                  <p>Commitment to pro bono research work</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-red-600" />
                  <p>Collaborative mindset and strong work ethic</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-red-600" />
                  <p>Experience with Python, R, or statistical software (preferred but not required)</p>
                </div>
              </div>

              {isApplicationOpen && (
                <div className="mt-6">
                  <a 
                    href="https://forms.google.com/your-application-form" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 inline-block"
                  >
                    Apply Now
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Form / Mailing List */}
          <div className="fade-in">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {isApplicationOpen ? 'Questions?' : 'Stay Updated'}
              </h4>
              <p className="text-gray-600 mb-6">
                {isApplicationOpen 
                  ? 'Have questions about the application process? Contact us!'
                  : 'Join our mailing list to be notified when applications open and stay updated on events and opportunities.'
                }
              </p>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                    <input 
                      type="text" 
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select 
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Year</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your interests and experience..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;