import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard", active: location === "/" },
    { path: "/about", label: "About GridMix", active: location === "/about" },
    { path: "/blog", label: "Blog", active: location === "/blog" },
    { path: "/about-me", label: "About Me", active: location === "/about-me" }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gray-900 dark:bg-gray-800 rounded-lg p-1">
                <div 
                  style={{
                    backgroundImage: 'url("/attached_assets/grimix logo green and blue_1751223794918.PNG")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                  className="w-full h-full"
                  role="img"
                  aria-label="GridMix Logo"
                />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                  GridMix
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  UK Energy Dashboard
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={item.active ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={item.active ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}