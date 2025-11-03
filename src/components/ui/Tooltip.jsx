import React from 'react';
import { cn } from '../../utils/cn';

const Tooltip = ({ children, text }) => {
  return (
    <div className="group relative flex">
      {children}
      <span
        className={cn(
          'absolute bottom-full mb-2 hidden w-max rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-md group-hover:block'
        )}
      >
        {text}
      </span>
    </div>
  );
};

export { Tooltip };
