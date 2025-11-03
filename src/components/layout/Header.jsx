import React from 'react';
import { Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Home className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Axon</span>
      </a>
      <h1 className="text-xl font-semibold">Axon</h1>
    </header>
  );
};

export default Header;
