import React from 'react';

export function ResponsiveWrapper({ 
  children, 
  className = "", 
  mobileClass = "", 
  tabletClass = "", 
  desktopClass = "",
  as: Component = 'div'
}) {
  const baseClasses = "w-full transition-all duration-300";
  const responsiveClasses = `
    ${baseClasses}
    ${className}
    ${mobileClass}
    sm:${tabletClass}
    lg:${desktopClass}
  `.trim();

  return (
    <Component className={responsiveClasses}>
      {children}
    </Component>
  );
}

// Responsive Grid Component
export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-4 sm:gap-6 lg:gap-8",
  className = ""
}) {
  const gridCols = `grid-cols-${cols.mobile} sm:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`;
  
  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>
      {children}
    </div>
  );
}

// Responsive Text Component
export function ResponsiveText({ 
  children, 
  size = "base",
  className = "",
  as: Component = 'p'
}) {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-sm sm:text-base md:text-lg",
    lg: "text-base sm:text-lg md:text-xl",
    xl: "text-lg sm:text-xl md:text-2xl",
    "2xl": "text-xl sm:text-2xl md:text-3xl",
    "3xl": "text-2xl sm:text-3xl md:text-4xl"
  };

  return (
    <Component className={`${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
}

// Responsive Heading Component
export function ResponsiveHeading({ 
  children, 
  level = 1,
  size = "2xl",
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl md:text-3xl",
    base: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
    xl: "text-4xl sm:text-5xl md:text-6xl",
    "2xl": "text-5xl sm:text-6xl md:text-7xl"
  };

  const Component = `h${level}`;
  
  return (
    <Component className={`font-bold leading-tight ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </Component>
  );
}

// Responsive Container Component
export function ResponsiveContainer({ 
  children, 
  maxWidth = "7xl",
  padding = "px-4 sm:px-6 lg:px-8",
  className = ""
}) {
  return (
    <div className={`max-w-${maxWidth} mx-auto ${padding} ${className}`}>
      {children}
    </div>
  );
}

// Responsive Spacing Component
export function ResponsiveSpacing({ 
  children, 
  y = "py-8 sm:py-12 md:py-16 lg:py-20",
  x = "px-4 sm:px-6 lg:px-8",
  className = ""
}) {
  return (
    <div className={`${y} ${x} ${className}`}>
      {children}
    </div>
  );
}
