import React from 'react';
import { Menu, Home } from 'lucide-react';
import { Button } from '../ui/Button';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <a href="/" className="flex items-center gap-2 font-semibold md:hidden">
        <Home className="h-6 w-6" />
        <span className="">Axon</span>
      </a>
      <div className="w-full flex-1">
        {/* Future header content can go here, like a search bar */}
      </div>
    </header>
  );
};

export default Header;