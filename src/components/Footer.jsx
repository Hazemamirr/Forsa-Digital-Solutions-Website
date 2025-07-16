import React from 'react';

export function Footer() {
    return (
        <footer className="bg-slate-100 text-center text-sm text-gray-600 py-6 mt-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="#services" className="hover:text-blue-600 transition">Services</a>
                    <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
                    <a href="#about" className="hover:text-blue-600 transition">About Us</a>
                    <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
                </div>
                <p>© {new Date().getFullYear()} Forsa-Analytics. All rights reserved.</p>
            </div>
        </footer>
    );
}
