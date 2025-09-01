import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

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
                
                {/* Social Media Links */}
                <div className="flex justify-center gap-4 mt-4">
                    <a 
                        href="https://www.linkedin.com/company/forsa-digital-solutions/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a 
                        href="https://www.instagram.com/forsadigitalsolutions/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 transition-colors duration-300"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="text-2xl" />
                    </a>
                    <a 
                        href="https://www.tiktok.com/@forsa_analytics?lang=en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-300"
                        aria-label="TikTok"
                    >
                        <FaTiktok className="text-2xl" />
                    </a>
                </div>
                
                <p>© {new Date().getFullYear()} Forsa-Digital-Solutions. All rights reserved.</p>
            </div>
        </footer>
    );
}
