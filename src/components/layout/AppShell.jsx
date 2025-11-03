import React from 'react';

const AppShell = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {children}
    </div>
  );
};

export default AppShell;
