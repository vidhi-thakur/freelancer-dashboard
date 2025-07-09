"use client";
import {
  BarChart3,
  FileText,
  FolderKanban,
  Settings,
  Users,
  Wand2,
  Home,
  Plus,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: FileText,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Proposals",
    url: "/proposals",
    icon: Wand2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (): void => {
    const allCookies = Cookies.get();

    // Remove each cookie
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    console.log("All cookies cleared.");
    router.push("/welcome");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">FreelanceHub</span>
            <span className="text-xs text-muted-foreground">Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2">
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Invoice
          </Button>
        </div>
        <div className="px-2 pb-2 pt-0">
          <Button
            onClick={handleLogout}
            className="w-full"
            variant="outline"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
