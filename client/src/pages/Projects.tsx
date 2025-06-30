import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectsMap } from '@/components/ProjectsMap';

export function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <ProjectsMap />
      <Footer />
    </div>
  );
}