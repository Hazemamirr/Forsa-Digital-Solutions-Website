import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit attempted', formData);
    if (!validateForm()) {
      console.log('Validation failed', errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send form data to backend API
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Ready to transform your data strategy? Let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-primary-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary-900">Email</h4>
                    <p className="text-secondary-600">contact@forsa-analytics.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaPhone className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary-900">Phone</h4>
                    <p className="text-secondary-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary-900">Location</h4>
                    <p className="text-secondary-600">123 Data Street, Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FaCheck className="w-5 h-5 text-primary-600 mt-1" />
                  <span className="text-secondary-600">Expert team with 15+ years of experience</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaCheck className="w-5 h-5 text-primary-600 mt-1" />
                  <span className="text-secondary-600">Customized solutions for your business needs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaCheck className="w-5 h-5 text-primary-600 mt-1" />
                  <span className="text-secondary-600">Proven track record of successful projects</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaCheck className="w-5 h-5 text-primary-600 mt-1" />
                  <span className="text-secondary-600">Dedicated support and maintenance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-secondary-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-secondary-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-secondary-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-secondary-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.company ? 'border-red-500' : 'border-secondary-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Your Company"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-secondary-300'
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Tell us about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:bg-primary-700 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                  <FaCheck className="w-5 h-5" />
                  <p>Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <FaTimes className="w-5 h-5" />
                  <p>Something went wrong. Please try again later.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 