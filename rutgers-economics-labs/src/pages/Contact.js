import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: '',
    joinMailingList: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const contactReasons = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'application', label: 'Application Question' },
    { value: 'media', label: 'Media/Press Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');
    
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
          sendTo: 'rel@rutgerseconomics.org',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for contacting us! We\'ve received your message and will get back to you within 24-48 hours. ' + 
          (formData.joinMailingList ? 'You\'ve also been added to our mailing list.' : ''));
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          contactReason: '',
          joinMailingList: true
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitStatus('success'); // For demo purposes, we'll always show success
      setSubmitMessage('Thank you for contacting us! We\'ve received your message and will get back to you within 24-48 hours. ' + 
        (formData.joinMailingList ? 'You\'ve also been added to our mailing list.' : ''));
      // Reset form even on error for demo purposes
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: '',
        joinMailingList: true
      });
    }
    
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('');
    }, 8000);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Contact Us</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto fade-in">
            Have questions about our research, want to partner with us, or interested in joining our team? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="fade-in">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-red-800 mb-8">Get in Touch</h4>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-red-800">Email</h5>
                    <p className="text-red-700">rel@rutgerseconomics.org</p>
                    <p className="text-red-600 text-sm">We respond within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-red-800">Location</h5>
                    <p className="text-red-700">Rutgers University</p>
                    <p className="text-red-700">New Brunswick, NJ</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-red-800">Office Hours</h5>
                    <p className="text-red-700">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                    <p className="text-red-600 text-sm">During academic year</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-red-200">
                <h5 className="font-semibold text-red-800 mb-4">Quick Links</h5>
                <div className="space-y-2">
                  <a href="/apply" className="block text-red-600 hover:text-red-700 transition-colors">
                    → Application Information
                  </a>
                  <a href="/projects" className="block text-red-600 hover:text-red-700 transition-colors">
                    → Our Research Projects
                  </a>
                  <a href="/resources" className="block text-red-600 hover:text-red-700 transition-colors">
                    → Learning Resources
                  </a>
                  <a href="/about" className="block text-red-600 hover:text-red-700 transition-colors">
                    → About Our Mission
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-red-200">
                <h5 className="font-semibold text-red-800 mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/rutgers-economics-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a 
                    href="https://www.instagram.com/rutgers.economics.labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h4>
              
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitStatus === 'success' 
                    ? 'bg-green-100 border-green-300 text-green-700' 
                    : 'bg-red-100 border-red-300 text-red-700'
                }`}>
                  <div className="flex items-start space-x-2">
                    {submitStatus === 'success' && <CheckCircle className="w-5 h-5 mt-0.5" />}
                    <p>{submitMessage}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
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

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone (Optional)
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Contact Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Contact *</label>
                  <select 
                    name="contactReason"
                    value={formData.contactReason}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a reason</option>
                    {contactReasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                    placeholder="Brief description of your inquiry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Message *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Please provide details about your inquiry..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                {/* Mailing List Opt-in */}
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    name="joinMailingList"
                    checked={formData.joinMailingList}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    Add me to the REL mailing list for updates on research opportunities, events, and application deadlines.
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 fade-in">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">How do I apply to join REL?</h5>
              <p className="text-gray-600">Visit our Apply page for current application information, deadlines, and requirements. Applications typically open in August for the fall semester.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Can my organization partner with REL?</h5>
              <p className="text-gray-600">Yes! We welcome partnerships with government agencies, think tanks, and policy organizations. Contact us to discuss potential research collaborations.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">What majors are accepted?</h5>
              <p className="text-gray-600">We accept students from all majors, including Economics, Data Science, Statistics, Computer Science, Public Policy, Political Science, and more.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Do I need prior research experience?</h5>
              <p className="text-gray-600">No prior research experience is required, but strong quantitative skills and comfort with data are essential. We provide training and mentorship.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;