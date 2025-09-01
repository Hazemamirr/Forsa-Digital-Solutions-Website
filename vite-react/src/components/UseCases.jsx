import React from 'react';

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-6 bg-gray-100 animate-fade-in-up">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">Use Cases</h3>
        <p className="text-lg text-gray-600 mb-8">From predictive maintenance to customer segmentation, explore real-world applications of our services.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 shadow-md rounded-xl hover:shadow-lg transition">
            <h5 className="text-xl font-semibold mb-2">Retail Forecasting</h5>
            <p className="text-gray-600">Boost accuracy in sales predictions with our AI-powered demand forecasting solutions.</p>
          </div>
          <div className="bg-white p-5 shadow-md rounded-xl hover:shadow-lg transition">
            <h5 className="text-xl font-semibold mb-2">Churn Prediction</h5>
            <p className="text-gray-600">Identify at-risk customers and reduce churn using tailored machine learning models.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
