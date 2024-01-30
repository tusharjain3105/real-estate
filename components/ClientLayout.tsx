"use client";
import { saveCookie } from "@/server-actions";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  const token = useSearchParams().get("token");

  useEffect(() => {
    if (token) {
      saveCookie("AUTH_TOKEN", token, {
        httpOnly: true,
      });
    }
  }, [token]);

  return <>{children}</>;
};
export default ClientLayout;
