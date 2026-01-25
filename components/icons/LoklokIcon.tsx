
import React from 'react';

const LoklokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="4" fill="#FFC107"/>
    <path d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default LoklokIcon;
