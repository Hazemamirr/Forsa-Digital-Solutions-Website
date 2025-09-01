import React, { useState, useEffect } from 'react';
import { FaChartLine, FaRobot, FaDatabase, FaArrowRight } from 'react-icons/fa';

export function Portfolio() {
  useEffect(() => {
    console.log('Portfolio component mounted');
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Hotel Booking Demand Analysis',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      overview: 'Performed a comprehensive analysis on hotel booking data to uncover patterns in guest behavior and predict booking demand. Focused on identifying factors leading to cancellations, seasonal booking trends, and customer segmentation for improved business planning and resource allocation.',
      technologies: ['Python', 'Pandas & NumPy', 'Matplotlib & Seaborn', 'Jupyter Notebook'],
      results: [
        'Identified key cancellation predictors such as lead time and special requests',
        'Visualized seasonal trends showing peak booking periods',
        'Provided actionable insights for marketing and operations teams to reduce no-shows and optimize revenue'
      ]
    },
    {
      id: 2,
      title: 'Mobile Addiction Detection',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      overview: 'Conducted a comprehensive data science project to analyze smartphone addiction using real behavioral data such as screen time, app usage, and stress levels. Applied both regression and classification models to identify key addiction predictors and enable early intervention strategies.',
      technologies: ['Python', 'Pandas & Scikit-learn', 'Matplotlib & Seaborn', 'Jupyter Notebook'],
      results: [
        'Achieved 95.4% accuracy using Support Vector Classifier',
        'Identified night usage, gaming time, and stress level as top addiction predictors',
        'Demonstrated KNN model robustness with 93.8% accuracy even under noisy data conditions'
      ]
    },
    {
      id: 3,
      title: 'Customer Purchase Behavior Analysis – Zara Dataset',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      overview: 'Developed an end-to-end data science pipeline to analyze customer purchase behavior using Zara’s dataset. The project aimed to uncover insights into product popularity, sales distribution across demographics, and the influence of factors like location and age on buying habits. Exploratory data analysis, visualization, and model evaluation were conducted to support business decision-making.',
      technologies: ['Python', 'Pandas & NumPy', 'Matplotlib & Seaborn', 'Jupyter Notebook'],
      results: [
        'Identified top-performing product categories based on customer segments',
        'Revealed strong correlation between customer age and specific product choices',
        'Visualized sales trends by location to support targeted marketing strategies'
      ]
    }
  ];

  console.log('Rendering Portfolio component with', projects.length, 'projects');

  return (
    <div id="portfolio" className="bg-gradient-to-b from-secondary-50 to-white">
      {/* Portfolio Header */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h1 className="text-4xl font-bold text-white mb-8 animate-slide-in-up">Our Portfolio</h1>
          <p className="text-xl text-primary-100 animate-slide-in-up stagger-1">
            Explore our successful data solutions and transformations
          </p>
        </div>
      </section>

      {/* Main Portfolio */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 animate-slide-in-up">
              Projects
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto animate-slide-in-up stagger-1">
              Discover how we've helped businesses transform their data strategy
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.overview && (
                    <>
                      <h4 className="text-sm font-semibold text-secondary-700 mb-1">Overview</h4>
                      <p className="text-secondary-600 mb-4 leading-relaxed">{project.overview}</p>
                    </>
                  )}

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-secondary-700 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-secondary-700 mb-2">Key Results</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-xs text-secondary-600 flex items-start">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Project Button */}
                  <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center group">
                    <span className="mr-2">Request Access</span>
                    <FaArrowRight className="text-sm transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
