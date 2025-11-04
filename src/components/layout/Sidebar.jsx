import React from 'react';
import { Home, PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Sheet, SheetContent } from '../ui/Sheet';

const SidebarContent = ({ sets, selectSet, selectedSetId, openCreateSetModal, toggleSidebar }) => (
  <div className="flex h-full max-h-screen flex-col gap-2">
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <a href="./pages/HomePage" className="flex items-center gap-2 font-semibold">
        <Home className="h-6 w-6" aria-hidden="true" />
        <span className="">Axon</span>
      </a>
    </div>
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Button
          variant="outline"
          className="justify-start gap-2 my-2"
          onClick={() => {
            openCreateSetModal();
            if (toggleSidebar) toggleSidebar(false);
          }}
        >
          <PlusCircle className="h-4 w-4" />
          Create Set
        </Button>
        <p className="text-muted-foreground px-2 py-2">Your Sets</p>
        {sets.map((set) => (
          <Button
            key={set.id}
            variant="ghost"
            className={cn(
              "justify-start",
              selectedSetId === set.id && "bg-accent"
            )}
            onClick={() => {
              selectSet(set.id);
              if (toggleSidebar) toggleSidebar(false);
            }}
          >
            {set.name}
          </Button>
        ))}
      </nav>
    </div>
  </div>
);

const Sidebar = ({ sets, selectSet, selectedSetId, openCreateSetModal, isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
          <SheetContent>
            <SidebarContent
              sets={sets}
              selectSet={selectSet}
              selectedSetId={selectedSetId}
              openCreateSetModal={openCreateSetModal}
              toggleSidebar={toggleSidebar}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-10 w-[220px] lg:w-[280px] border-r bg-muted/40">
        <SidebarContent
          sets={sets}
          selectSet={selectSet}
          selectedSetId={selectedSetId}
          openCreateSetModal={openCreateSetModal}
        />
      </div>
    </>
  );
};

export default Sidebar;
