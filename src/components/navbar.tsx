'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";


const pathnameMap= {
  "tasks": {
    title:"My Tasks",
    description:"View all your tasks"
  },
  "projects": {
    title:"My Projects",
    description:"View projects here"
  },
}


const defaultMap={
  title:"Home",
  description:"Monitor all projects and tasks here"
}

const Navbar = () => {

  const pathname = usePathname()

  const pathnameParts = pathname.split("/")
  // .filter(Boolean)

  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap

  // const title = pathnameKey ? pathnameMap[pathnameKey].title : defaultMap.title
  const{title, description} = pathnameKey ? pathnameMap[pathnameKey] : defaultMap

  return (
    <nav className="pt-4 px-6 flex items-center justify-between ">
      <div className="flex-col hidden lg:flex ">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
