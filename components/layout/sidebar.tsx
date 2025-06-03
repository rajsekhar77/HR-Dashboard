"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Users,
  BookmarkIcon,
  PieChart,
  Menu,
  Settings,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    icon: <BookmarkIcon className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <PieChart className="h-5 w-5" />,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Add Employee",
    href: "/add-employee",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Help",
    href: "/help",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavList = ({ items }: { items: NavItem[] }) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              pathname === item.href
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden absolute left-4 top-3 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-10">
          <ScrollArea className="h-full py-6 pl-6 pr-2">
            <div className="mb-6 pl-2 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span className="font-semibold text-lg">HR Dashboard</span>
            </div>
            <div className="space-y-6">
              <NavList items={navItems} />
              <div className="h-px bg-border" />
              <NavList items={secondaryNavItems} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <aside className="hidden border-r bg-background/60 lg:block w-64 shrink-0 z-30">
        <ScrollArea className="h-full py-6 pl-6 pr-2">
          <div className="mb-6 pl-2 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            <span className="font-semibold text-lg">HR Dashboard</span>
          </div>
          <div className="space-y-6">
            <NavList items={navItems} />
            <div className="h-px bg-border" />
            <NavList items={secondaryNavItems} />
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
