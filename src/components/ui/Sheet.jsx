import React from 'react';
import { cn } from '../../utils/cn';

const Sheet = ({ open, onOpenChange, children }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={cn(
          'fixed z-40 inset-y-0 left-0 h-full w-72 bg-background border-r transition-transform duration-300 ease-in-out',
          open ? 'transform-none' : '-translate-x-full'
        )}
      >
        {children}
      </div>
    </>
  );
};

const SheetContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("h-full", className)} {...props}>
      {children}
    </div>
  );
};

export { Sheet, SheetContent };
