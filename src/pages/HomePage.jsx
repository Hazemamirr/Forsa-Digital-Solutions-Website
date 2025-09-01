import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { Testimonials } from '../components/Testimonials';
import { withPageAnimation } from '../components/withPageAnimation';
import loomLogo from '/images/Loom-logo.jpg';
import sbLogo from '/images/SB-logo.jpg';

export default function HomePage() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Trusted By Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Trusted By Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <img src={loomLogo} alt="Company 1 - Loom" className="h-20 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={sbLogo} alt="Company 2 - SB" className="h-20 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
             Why Choose Forsa?
           </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">We speak startup language</h3>
              <p className="text-gray-600">
                Flexible, no big-agency prices
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Custom Solutions</h3>
              <p className="text-gray-600">
                We tailor our solutions to meet your specific business needs and challenges.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Proven Results</h3>
              <p className="text-gray-600">
                Our track record speaks for itself - we deliver measurable results for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section id="contact-section" className="py-24 px-6 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100">
            Let's discuss how we can help transform your Shopify data into actionable insights.
          </p>
        </div>
        <Contact />
      </section>
    </div>
  );
}
