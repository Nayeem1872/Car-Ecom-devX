"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChartBig,
  Settings,
  User as UserIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  TagsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: BarChartBig, label: "Analytics", href: "/analytics" },
  { icon: ShoppingBag, label: "Products", href: "/admin/dashboard/products" },
  { icon: TagsIcon, label: "Categories", href: "/admin/dashboard/categories" },
  { icon: UserIcon, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=john",
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    // Remove the "ecom_token" cookie using js-cookie
    Cookies.remove("ecom_token");
    // Redirect to the /admin page
    router.push("/admin");
  };
  return (
    <motion.div
      className="h-screen border-r border-border fixed left-0 top-0 z-40 flex flex-col bg-background"
      initial={{ width: expanded ? 240 : 80 }}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-xl"
            >
              Dashboard
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-x-3 py-3",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon size={20} />
                  <AnimatePresence mode="wait">
                    {expanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-x-3 mb-4">
          <img
            src={
              user.avatar ||
              "https://api.dicebear.com/6.x/avataaars/svg?seed=default"
            }
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="font-medium text-sm">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email || "user@example.com"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-x-3"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
