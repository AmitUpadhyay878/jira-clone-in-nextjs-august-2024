import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DottedSepatator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="logo-site"
          height={56}
          width={152}
          priority
        />
      </Link>
      <DottedSepatator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSepatator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
