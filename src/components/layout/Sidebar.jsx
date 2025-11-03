import React from 'react';
import { Package2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

const Sidebar = ({ sets, selectSet, selectedSetId }) => {
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
            <p className="text-muted-foreground px-2 py-2">Your Sets</p>
            {sets.map((set) => (
              <Button
                key={set.id}
                variant="ghost"
                className={cn(
                  "justify-start",
                  selectedSetId === set.id && "bg-accent"
                )}
                onClick={() => selectSet(set.id)}
              >
                {set.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
