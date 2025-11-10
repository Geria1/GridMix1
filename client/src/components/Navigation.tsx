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
    <nav className="sticky top-0 z-50 glass-nav shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-bold gradient-text-energy group-hover:scale-105 transition-transform duration-300">
                  GridMix
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block font-medium">
                  UK Energy Dashboard
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={item.active
                    ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl rounded-2xl px-5 py-2.5 font-semibold transition-all duration-300 hover:scale-105"
                    : "hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-xl rounded-2xl px-5 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-11 h-11 p-0 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-xl"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 p-0 lg:hidden hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-xl"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl animate-in slide-in-from-top duration-300">
            <div className="px-3 pt-4 pb-5 space-y-3">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full justify-start rounded-2xl transition-all duration-300 py-3 ${
                      item.active
                        ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 text-white shadow-lg font-semibold"
                        : "hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-xl hover:shadow-md font-medium"
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