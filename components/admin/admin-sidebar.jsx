"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Hexagon, Package, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { label: "Colis", href: "/admin", icon: Package },
  { label: "Clients", href: "/admin/clients", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="dark border-sidebar-border">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2.5 px-1.5 py-1">
          <span className="relative flex size-8 shrink-0 items-center justify-center">
            <Hexagon className="size-8 text-gold" strokeWidth={1.5} />
            <Box className="absolute size-3.5 text-gold" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-foreground">
              SwiftWay
            </span>
            <span className="text-[9px] font-medium tracking-[0.2em] text-gold">
              ESPACE ADMIN
            </span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.label}
                      className="data-active:bg-gold/15 data-active:text-gold"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
