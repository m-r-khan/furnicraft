// Initialize demo data for the application
export const initializeData = () => {
    // Initialize demo users if not exists
    const existingUsers = localStorage.getItem('furnicraft_users');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@furnicraft.com',
          password: 'admin123',
          role: 'admin'
        },
        {
          id: '2',
          name: 'Test User',
          email: 'user@test.com',
          password: 'user123',
          role: 'user'
        }
      ];
      localStorage.setItem('furnicraft_users', JSON.stringify(demoUsers));
    }
  };
  
  // Call this when the app starts
  if (typeof window !== 'undefined') {
    initializeData();
  }
  