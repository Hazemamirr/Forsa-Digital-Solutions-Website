import React from 'react';

export function ContactForm() {
    return (
        <section className="min-h-screen bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>

                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input type="text" className="w-full border rounded-md px-4 py-2" placeholder="Your full name" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input type="email" className="w-full border rounded-md px-4 py-2" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Message</label>
                        <textarea rows="5" className="w-full border rounded-md px-4 py-2" placeholder="Tell us how we can help you..."></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
