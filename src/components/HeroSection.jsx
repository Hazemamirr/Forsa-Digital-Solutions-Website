// File: src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaDatabase, FaRobot } from 'react-icons/fa';
import homepagePhoto from '/images/Homepage-photo.png';

export function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
    // Reset animations when component mounts
    const elements = document.querySelectorAll('.animate-on-scroll, .animate-slide-in-left, .animate-slide-in-up, .animate-scale-in');
    elements.forEach(el => {
      el.classList.remove('visible');
      void el.offsetWidth; // Force reflow
      el.classList.add('visible');
    });
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Team data
  const team = [
    {
      name: "Hazem Mowafi",
      title: "CEO",
      role: "Co-founder",
      expertise: "Data Analyst and Visualization Expert",
      bio: `Hazem Mowafi is currently pursuing a Bachelor's degree in Business Informatics at the German University in Cairo, with expected graduation in 2026. He has gained hands-on experience through student roles at Nestlé and Siemens Mobility, where he analyzed and visualized data using tools such as Excel, Power BI, Python, and SQL to drive business decisions and process improvements. At Nestlé, Hazem focused on automating reports and cleaning multi-source datasets for accurate analysis, while at Siemens he developed interactive dashboards to streamline documentation workflows. He also participated in marketing and sales initiatives at The Address Investments. Hazem holds certifications from IBM and Microsoft in data science and Power BI and is proficient in Python, Java, HTML, CSS, SQL, and Tableau.`
    },
    {
      name: "Hazem Amir",
      title: "COO",
      role: "Co-founder",
      expertise: "Expert in Data Security",
      bio: `With hands-on experience in cybersecurity, penetration testing, media buying, and digital solutions, Hazem has contributed to projects that strengthen system security, enhance online presence, and support smarter business decisions. Certified through the IBM Cybersecurity Analyst Professional Certificate and advanced specialization programs, he has applied skills in Python scripting, network defense, and incident response alongside expertise in managing digital ad campaigns and optimizing marketing performance. His work spans ethical hacking, web application testing, cryptographic tools, and data-driven media strategies, all aimed at building resilient systems and expanding business growth. Motivated by a vision of helping organizations harness both security and digital innovation, he is dedicated to turning technical expertise and marketing insights into sustainable solutions and long-term success.`
    },
    {
      name: "Hamza Tayel",
      title: "CTO",
      role: "Co-founder",
      expertise: "AI and Machine Learning Expert",
      bio: `Hamza Tayel is a third-year Business Informatics student at the German University in Cairo with a strong foundation in data analysis and visualization. He interned at Banque Du Caire, where he supported the Data Analytics department by building dashboards using Power BI and working with ERP systems and cloud-based AI tools. He also interned at Majid Al-Futtaim, where he performed data cleaning and analysis using Python. Hamza is proficient in Python, SQL, Excel, and data science libraries like Pandas and Scikit-learn. He has experience with Tableau, JupyterLab, and RapidMiner and holds certifications from IBM and SAP. Passionate about blending business and technology, Hamza brings analytical thinking, strong communication, and a collaborative mindset to every team he joins.`
    }
  ];

  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 animate-on-scroll">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-left">
                Transform Your Data into <span className="text-primary-300">Strategic Insights</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto lg:mx-0 animate-slide-in-left stagger-1">
                We help enterprises unlock the full potential of their data through advanced analytics, 
                machine learning, and custom data solutions that drive measurable business outcomes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-on-scroll">
              <button
                onClick={scrollToContact}
                className="bg-white text-primary-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary-100 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-up stagger-2 text-sm sm:text-base"
              >
                Schedule a Consultation
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white/10 transition-all duration-300 animate-slide-in-up stagger-3 text-sm sm:text-base"
              >
                Explore Solutions
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 animate-on-scroll">
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaChartLine className="text-2xl sm:text-3xl text-primary-300 mb-2 sm:mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs sm:text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">Data Analytics</span>
              </div>
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaDatabase className="text-2xl sm:text-3xl text-primary-300 mb-2 sm:mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" style={{ animationDelay: '0.2s' }} />
                <span className="text-xs sm:text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">Data Engineering</span>
              </div>
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaRobot className="text-2xl sm:text-3xl text-primary-300 mb-2 sm:mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" style={{ animationDelay: '0.4s' }} />
                <span className="text-xs sm:text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">AI Solutions</span>
              </div>
            </div>
          </div>

          {/* Responsive image container */}
          <div className="relative animate-on-scroll group order-first lg:order-last">
            <div className="relative z-10 animate-scale-in transform transition-transform duration-300 group-hover:scale-105 flex justify-center lg:justify-end">
              <img
                src={homepagePhoto}
                alt="Homepage Photo"
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-auto h-auto"
                style={{ maxWidth: '400px' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg blur-2xl animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - hidden on mobile for better performance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Modal/Overlay - improved for mobile */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-2xl hover:text-gray-600 transition-colors"
              onClick={() => setSelectedMember(null)}
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">{selectedMember.name}</h2>
            <div className="text-center text-gray-500 mb-4 text-sm sm:text-base">{selectedMember.title} | {selectedMember.role}</div>
            <div className="text-base sm:text-lg text-gray-700 whitespace-pre-line">{selectedMember.bio}</div>
          </div>
        </div>
      )}
    </section>
  );
}