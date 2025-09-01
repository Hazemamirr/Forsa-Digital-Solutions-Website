import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-slate-100 text-center text-sm text-gray-600 py-6 mt-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
                    <Link to="/portfolio" className="hover:text-blue-600 transition">Portfolio</Link>
                    <Link to="/about" className="hover:text-blue-600 transition">About</Link>
                </div>
                <p>© {new Date().getFullYear()} Forsa-Analytics. All rights reserved.</p>
            </div>
        </footer>
    );
}
