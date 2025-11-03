import React from 'react';
import { Package2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" aria-hidden="true" />
            <span className="">Axon</span>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Sidebar content will go here (e.g., list of sets) */}
            <p className="text-muted-foreground">Your Sets</p>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
