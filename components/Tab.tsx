"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tab = ({ children, href = "/", className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "px-2 border-b border-b-transparent hover:border-b-white py-2 transition data-[active=true]:text-orange-800",
        className
      )}
      data-active={isActive}
      role="button"
      href={href}
    >
      {children}
    </Link>
  );
};

export default Tab;
