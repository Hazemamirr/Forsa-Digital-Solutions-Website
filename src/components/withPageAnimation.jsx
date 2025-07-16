import React, { useEffect } from 'react';

export function withPageAnimation(WrappedComponent) {
  return function WithPageAnimation(props) {
    useEffect(() => {
      // Reset animations when component mounts
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-slide-in-left, .animate-slide-in-up, .animate-scale-in');
      elements.forEach(el => {
        el.classList.remove('visible');
        void el.offsetWidth; // Force reflow
        el.classList.add('visible');
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
} 