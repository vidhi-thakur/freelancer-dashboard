"use client";

import dynamic from "next/dynamic";
import { SidebarProvider } from "../ui/sidebar";
const AppSidebar = dynamic(() =>
  import("../app-sidebar").then((mod) => mod.AppSidebar)
);

import { useAuthToken } from "@/hooks/useAuthToken";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasToken } = useAuthToken();
  useEffect(() => {
    if (!hasToken) {
      return redirect("/welcome");
    }
  }, []);
  if (!hasToken) return null; // Add loader later
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
