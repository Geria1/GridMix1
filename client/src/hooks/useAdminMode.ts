import { useState, useEffect } from 'react';

export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for admin mode
    const storedAdminMode = localStorage.getItem('gridmix_admin_mode');
    
    // Check URL parameter for admin mode
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === 'true') {
      localStorage.setItem('gridmix_admin_mode', 'true');
      setIsAdmin(true);
    } else if (adminParam === 'false') {
      localStorage.removeItem('gridmix_admin_mode');
      setIsAdmin(false);
    } else if (storedAdminMode === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const toggleAdmin = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    if (newAdminMode) {
      localStorage.setItem('gridmix_admin_mode', 'true');
    } else {
      localStorage.removeItem('gridmix_admin_mode');
    }
  };

  return { isAdmin, toggleAdmin };
}
