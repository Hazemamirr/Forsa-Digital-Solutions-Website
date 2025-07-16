// File: src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaDatabase, FaRobot } from 'react-icons/fa';

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
      bio: `Hazem Amir is currently pursuing a Bachelor's degree in Computer Engineering at the Egypt University of Informatics, with expected graduation in 2026. He gained practical experience during a Software Engineering internship at Incorta, where he worked on internal tools using Python and SQL, optimized backend services, and integrated APIs to enhance data dashboards. Hazem also took part in the InnovEgypt training program, contributing to the ideation of a potential tech startup. He is skilled in mobile and web development using Flutter, JavaScript, and Node.js, and has hands-on experience in cybersecurity and AI/ML using TensorFlow and PyTorch. He holds multiple certifications from IBM in cybersecurity and AI, and brings strong communication, analytical thinking, and technical skills to any team.`
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
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4 animate-on-scroll">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-left">
                Transform Your Data into <span className="text-primary-300">Strategic Insights</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl animate-slide-in-left stagger-1">
                We help enterprises unlock the full potential of their data through advanced analytics, 
                machine learning, and custom data solutions that drive measurable business outcomes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
              <button
                onClick={scrollToContact}
                className="bg-white text-primary-900 font-semibold px-8 py-4 rounded-lg hover:bg-primary-100 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-up stagger-2"
              >
                Schedule a Consultation
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 animate-slide-in-up stagger-3"
              >
                Explore Solutions
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 animate-on-scroll">
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaChartLine className="text-3xl text-primary-300 mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">Data Analytics</span>
              </div>
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaDatabase className="text-3xl text-primary-300 mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" style={{ animationDelay: '0.2s' }} />
                <span className="text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">Data Engineering</span>
              </div>
              <div className="flex flex-col items-center text-center group hover-lift">
                <FaRobot className="text-3xl text-primary-300 mb-3 animate-float transform transition-transform duration-300 group-hover:scale-110" style={{ animationDelay: '0.4s' }} />
                <span className="text-sm text-primary-200 group-hover:text-primary-100 transition-colors duration-300">AI Solutions</span>
              </div>
            </div>
          </div>

          {/* Remove the Our Leadership Team section (team cards and modal) and replace it with the Homepage-photo.png image. */}
          {/* Find and remove the <div className="pt-12">...</div> block that renders the team cards. */}
          {/* If any modal logic for team is present, remove it as well. */}
          {/* Ensure the image block remains: */}
          <div className="relative animate-on-scroll group">
            <div className="relative z-10 animate-scale-in transform transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/Homepage-photo.png"
                alt="Homepage Photo"
                style={{ width: '400px', height: 'auto' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg blur-2xl animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Modal/Overlay */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-3xl w-full relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setSelectedMember(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center mb-2">{selectedMember.name}</h2>
            <div className="text-center text-gray-500 mb-4">{selectedMember.title} | {selectedMember.role}</div>
            <div className="text-lg text-gray-700 whitespace-pre-line">{selectedMember.bio}</div>
          </div>
        </div>
      )}
    </section>
  );
}