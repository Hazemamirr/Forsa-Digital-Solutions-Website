import React from 'react';

export function ContactForm() {
    return (
        <section className="min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>

                <form className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Name</label>
                        <input 
                            type="text" 
                            className="w-full border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" 
                            placeholder="Your full name" 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email</label>
                        <input 
                            type="email" 
                            className="w-full border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" 
                            placeholder="you@example.com" 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Message</label>
                        <textarea 
                            rows="4" 
                            className="w-full border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical" 
                            placeholder="Tell us how we can help you..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base hover:shadow-lg transform hover:scale-105"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
