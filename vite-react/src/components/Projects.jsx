import React from 'react';

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-white animate-fade-in-up">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Featured Projects</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg shadow-md text-left hover:shadow-lg transition">
            <div
              className="aspect-video bg-cover bg-center rounded-md mb-4"
              style={{ backgroundImage: "url('https://via.placeholder.com/400x250')" }}
            ></div>
            <h4 className="text-xl font-semibold mb-2">Retail Chain Optimization</h4>
            <p className="text-gray-600 text-sm">
              Increased sales by 15% through targeted marketing campaigns and product bundling strategies.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg shadow-md text-left hover:shadow-lg transition">
            <div
              className="aspect-video bg-cover bg-center rounded-md mb-4"
              style={{ backgroundImage: "url('https://via.placeholder.com/400x250')" }}
            ></div>
            <h4 className="text-xl font-semibold mb-2">Logistics Process Efficiency</h4>
            <p className="text-gray-600 text-sm">
              Reduced transportation costs by 10% using route optimization algorithms and delivery clustering.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg shadow-md text-left hover:shadow-lg transition">
            <div
              className="aspect-video bg-cover bg-center rounded-md mb-4"
              style={{ backgroundImage: "url('https://via.placeholder.com/400x250')" }}
            ></div>
            <h4 className="text-xl font-semibold mb-2">Telecom Customer Engagement</h4>
            <p className="text-gray-600 text-sm">
              Improved user satisfaction by 20% through AI-powered chatbots and predictive churn models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
