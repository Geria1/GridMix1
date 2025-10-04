import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAdminMode } from "@/hooks/useAdminMode";

export function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdminMode();

  const navItems = [
    { path: "/", label: "Dashboard", active: location === "/" },
    { path: "/projects", label: "Projects", active: location === "/projects" },
    { path: "/forecast", label: "Forecast", active: location === "/forecast" },
    { path: "/alerts", label: "Alerts", active: location === "/alerts" },
    { path: "/carbon", label: "Carbon Tracker", active: location === "/carbon" },
    { path: "/blog", label: "Blog", active: location === "/blog" },
    { path: "/about", label: "About GridMix", active: location === "/about" },
    { path: "/about-me", label: "About Me", active: location === "/about-me" },
    ...(isAdmin ? [{ path: "/admin", label: "Admin", active: location === "/admin" }] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                GridMix
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block font-medium">
                UK Energy Dashboard
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={item.active 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm rounded-lg px-4 py-2 font-medium transition-all duration-200" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4 py-2 transition-all duration-200"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-3 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full justify-start rounded-lg transition-all duration-200 ${
                      item.active 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm font-medium" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}