
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 mt-8 text-center text-slate-400/60">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} GURITAP Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
