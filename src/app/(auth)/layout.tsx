"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthlayoutProps {
  children: React.ReactNode;
}
const Authlayout = ({ children }: AuthlayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auth max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image
            src="/logo.svg"
            alt="logo-site"
            height={56}
            width={152}
            priority
          />
          <Button asChild variant={"secondary"}>
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-3 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Authlayout;
