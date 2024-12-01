"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
