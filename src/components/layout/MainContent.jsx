import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 pr-6 pl-6 pt-4 pb-4">
      {children}
    </main>
  );
};

export default MainContent;
