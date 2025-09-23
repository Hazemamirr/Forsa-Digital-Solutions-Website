import React, { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaLightbulb, FaRocket, FaAward, FaHandshake } from 'react-icons/fa';
import Contact from './Contact';
import logo from '/images/Forsa-Digital-Solutions-Logo.png';
import hazemMowafi from '/images/team/Hazem Mowafi.jpg';
import hamzaTayel from '/images/team/Hamza Tayel.jpg';
import hazemAmir from '/images/team/Hazem Amir.jpg';
// Removed import coo

export function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-trigger').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      icon: <FaUsers className="w-8 h-8 text-primary-600" />,
      value: '50+',
      label: 'Enterprise Clients',
      description: 'Trusted by leading companies across various industries'
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-primary-600" />,
      value: '200+',
      label: 'Projects Completed',
      description: 'Successfully delivered data solutions and transformations'
    },
    {
      icon: <FaAward className="w-8 h-8 text-primary-600" />,
      value: '15+',
      label: 'Years Experience',
      description: 'Deep expertise in data analytics and engineering'
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-primary-600" />,
      value: '98%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding client expectations'
    }
  ];

  // Team data for modal
  const team = [
    {
      name: "Hazem Mowafi",
      title: "CEO",
      role: "Co-founder",
      expertise: "Data Analyst and Visualization Expert",
      bio: `With hands-on experience in data analytics, visualization, and digital solutions, Hazem has contributed to projects that improve reporting, streamline workflows, and support smarter business decisions. Certified through the IBM Data Science Professional Certificate, he focuses on turning data into clear insights and practical solutions. He is motivated by a vision of helping organizations harness data and digital innovation to drive sustainable growth and long-term success.`
    },
    {
      name: "Hamza Tayel",
      title: "CTO",
      role: "Co-founder",
      expertise: "AI and Machine Learning Expert",
      bio: `Hamza Tayel is one of our Co-Founders with hands-on experience in data analytics, visualization, and AI-driven solutions, he has worked on projects ranging from building intelligent chatbots to designing interactive dashboards in Power BI and SQL pipelines. Certified through the IBM Data Science Professional Certificate and SAP Fundamentals, Hamza bridges business and technology by transforming complex data into actionable insights. His passion lies in empowering organizations to make smarter, data-driven decisions.`
    },
    {
      name: "Hazem Amir",
      title: "COO",
      role: "Co-founder",
      expertise: "Data Security Expert",
      bio: `Hazem Amir is a cybersecurity enthusiast with hands-on experience in penetration testing, network security, and digital forensics. He has worked on projects ranging from building Python-based ethical hacking tools to conducting web application vulnerability assessments and exploiting systems in controlled lab environments. Certified through the IBM Cybersecurity Analyst Professional Certificate, the IBM Advanced Cybersecurity Specialization, and NTI & ITIDA’s Cybersecurity Program, Hazem bridges technical expertise with a strong foundation in compliance frameworks and incident response. His passion lies in safeguarding digital assets and empowering organizations to build resilient, secure systems.`
    }
  ];
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div id="about" className="bg-gradient-to-b from-secondary-50 to-white">
      {/* Our Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 animate-slide-in-left mb-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Story</h2>
              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                In 2024, after months of research and endless late-night discussions, we founded our company with one goal: to help Egypt's growing local brands unlock the power of their data.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                The idea came to us when we noticed how the local brand market exploded after the 2019 pandemic — but many businesses were struggling to turn all that data into real insights.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                As three passionate college students, we decided to step in. Today, we're proud to work with startups just like us, providing affordable, clear, and actionable analytics that fuel smarter decisions and faster growth.
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
              <img src={logo} alt="Forsa-Analytics Logo" className="w-full max-w-3xl max-h-56 object-contain rounded-lg" />
            </div>
          </div>
          {/* Remove the Our team collaborating image and its container from the Our Story section */}
          {/* The image and the blue square div are removed for a cleaner layout. */}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-secondary-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-16 animate-fade-down">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in [animation-delay:0.1s] group hover:bg-primary-50/50 border border-secondary-100">
              <FaChartLine className="text-4xl text-primary-600 mb-6 transform transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Data-Driven Excellence</h3>
              <p className="text-secondary-600">We make decisions based on data, not assumptions, ensuring the highest quality outcomes.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in [animation-delay:0.2s] group hover:bg-primary-50/50 border border-secondary-100">
              <FaUsers className="text-4xl text-primary-600 mb-6 transform transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Client Partnership</h3>
              <p className="text-secondary-600">We build long-term relationships, working closely with clients to achieve their goals.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in [animation-delay:0.3s] group hover:bg-primary-50/50 border border-secondary-100">
              <FaLightbulb className="text-4xl text-primary-600 mb-6 transform transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Innovation</h3>
              <p className="text-secondary-600">We continuously explore new technologies and methodologies to deliver better solutions.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in [animation-delay:0.4s] group hover:bg-primary-50/50 border border-secondary-100">
              <FaRocket className="text-4xl text-primary-600 mb-6 transform transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Impact</h3>
              <p className="text-secondary-600">We measure our success by the tangible impact we create for our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-16 animate-fade-down">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="text-center animate-bounce-in [animation-delay:0.1s] group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden transform transition-transform duration-300 group-hover:scale-105 shadow-lg">
                  <img 
                    src={
                      member.name === "Hazem Mowafi" ? hazemMowafi :
                      member.name === "Hamza Tayel" ? hamzaTayel :
                      member.name === "Hazem Amir" ? hazemAmir :
                      // Use a placeholder avatar for the third member
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=256`
                    }
                    alt={member.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-900 group-hover:text-primary-600 transition-colors">{member.name}</h3>
                <p className="text-primary-600 mb-3">{member.role}</p>
                <p className="text-secondary-600">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
            <div className="text-center text-gray-500 mb-4">{selectedMember.role}</div>
            <div className="text-lg text-gray-700 whitespace-pre-line">{selectedMember.bio}</div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact-section" className="py-24 px-6 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Transform Your Data Strategy?</h2>
          <p className="text-xl text-primary-100 mb-4">
            Join the growing list of companies that trust Forsa-Analytics for their data needs.
          </p>
        </div>
        <Contact />
      </section>

      {/* Remove the stats section with Enterprise Clients, Projects Completed, Years Experience, and Client Satisfaction */}
      {/* The entire grid and its parent section are removed. */}
    </div>
  );
}
