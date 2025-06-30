import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Zap, Bell } from 'lucide-react';
import { NewsletterSignup } from '@/components/NewsletterSignup';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">GridMix</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time UK electricity generation data, democratizing access to energy information for everyone.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/about" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                About GridMix
              </Link>
              <Link href="/blog" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <Link href="/about-me" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                About Me
              </Link>
            </div>
          </div>
          
          <div>
            <NewsletterSignup
              title="Stay Informed"
              description="Get updates on UK energy trends and carbon intensity insights."
              source="footer"
              variant="footer"
              compact={true}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 GridMix. Data provided by National Grid ESO.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Terms
              </Link>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
