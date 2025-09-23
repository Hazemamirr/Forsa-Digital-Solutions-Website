import React, { useEffect } from 'react';
import { FaChartLine, FaDatabase, FaRobot, FaCloud, FaShieldAlt, FaCode, FaShopify, FaFileAlt, FaChartBar, FaEye } from 'react-icons/fa';
import Contact from './Contact';

export function Services() {
  useEffect(() => {
    console.log('Services component mounted');
  }, []);

  const services = [
    {
      icon: <FaShopify className="w-8 h-8 text-primary-600" />,
      title: 'Shopify API Data Extraction',
      description: 'Seamlessly extract your Shopify store data through our secure API integration. No coding required - we handle everything for you.',
      features: [
        'Secure API Integration',
        'No Code Required for Clients',
        'Automated Data Collection',
        'Real-time Data Sync'
      ]
    },
    {
      icon: <FaDatabase className="w-8 h-8 text-primary-600" />,
      title: 'Data Cleaning & Preparation',
      description: 'Transform messy, raw data into clean, structured datasets ready for analysis. We eliminate inconsistencies and prepare your data for insights.',
      features: [
        'Remove Duplicate Entries',
        'Fix Data Inconsistencies',
        'Standardize Formats',
        'Validate Data Quality'
      ]
    },
    {
      icon: <FaChartBar className="w-8 h-8 text-primary-600" />,
      title: 'EDA & Trend Analysis',
      description: 'Discover what\'s really happening in your store with our comprehensive exploratory data analysis and trend identification.',
      features: [
        'Sales Pattern Analysis',
        'Customer Behavior Insights',
        'Product Performance Trends',
        'Seasonal Trend Detection'
      ]
    },
    {
      icon: <FaEye className="w-8 h-8 text-primary-600" />,
      title: 'Visual Dashboards & Reports',
      description: 'Transform complex data into easy-to-understand visual dashboards and comprehensive reports that drive actionable insights.',
      features: [
        'Interactive Dashboards',
        'Custom Report Design',
        'Real-time Metrics',
        'Mobile-Responsive Views'
      ]
    },
    {
      icon: <FaFileAlt className="w-8 h-8 text-primary-600" />,
      title: 'Monthly Insights & Analysis',
      description: 'Get regular insights through monthly reports or opt for one-time deep-dive analysis. We deliver as reports, interactive dashboards, or both!',
      features: [
        'Monthly Performance Reports',
        'One-time Deep Analysis',
        'Report Delivery',
        'Interactive Dashboard Access'
      ]
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-primary-600" />,
      title: 'Media Buying Solutions',
      description: 'Strategic media buying and advertising solutions designed to maximize your ROI and reach your target audience effectively.',
      features: [
        'Campaign Strategy Development',
        'Audience Targeting & Segmentation',
        'Performance Monitoring & Optimization',
        'ROI Analysis & Reporting'
      ]
    }
  ];

  console.log('Rendering Services component with', services.length, 'services');

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="services" className="bg-gradient-to-b from-secondary-50 to-white">
      {/* Services Header */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h1 className="text-4xl font-bold text-white mb-8 animate-slide-in-up">Our Services</h1>
          <p className="text-xl text-primary-100 animate-slide-in-up stagger-1">
            Comprehensive solutions to drive your business forward
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4 sm:mb-6 animate-slide-in-up">
              Services
            </h2>
            <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto animate-slide-in-up stagger-1 px-4">
              From data extraction to actionable insights - we handle everything for your store
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in group hover:bg-primary-50/50 border border-secondary-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary-600 mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-secondary-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4 sm:mb-6">
              How We Deliver Results
            </h2>
            <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto px-4">
              We deliver as reports, interactive dashboards, or both!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-secondary-100">
              <FaFileAlt className="text-3xl sm:text-4xl text-primary-600 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-secondary-900">Reports</h3>
              <p className="text-sm sm:text-base text-secondary-600 mb-4">
                Comprehensive monthly reports delivered as professional documents with detailed insights, charts, and actionable recommendations.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-secondary-600">
                <li>• Monthly performance summaries</li>
                <li>• Detailed trend analysis</li>
                <li>• Actionable recommendations</li>
                <li>• Professional formatting</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-secondary-100">
              <FaEye className="text-3xl sm:text-4xl text-primary-600 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-secondary-900">Interactive Dashboards</h3>
              <p className="text-sm sm:text-base text-secondary-600 mb-4">
                Real-time interactive dashboards that allow you to explore your data, drill down into details, and monitor key metrics anytime.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-secondary-600">
                <li>• Real-time data updates</li>
                <li>• Interactive visualizations</li>
                <li>• Customizable views</li>
                <li>• Mobile-responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="container mx-auto text-center mb-12 sm:mb-16 animate-on-scroll">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 animate-slide-in-up">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-primary-100 animate-slide-in-up stagger-1 px-4">
            Let's discuss how we can help transform your Shopify data into actionable insights.
          </p>
        </div>
        <Contact />
      </section>
    </div>
  );
}
