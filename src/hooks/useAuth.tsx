import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('furnicraft_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('furnicraft_current_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const savedUsers = localStorage.getItem('furnicraft_users');
      if (!savedUsers) return false;

      const users = JSON.parse(savedUsers);
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        const userWithCorrectRole: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as 'user' | 'admin'
        };
        setUser(userWithCorrectRole);
        localStorage.setItem('furnicraft_current_user', JSON.stringify(userWithCorrectRole));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const savedUsers = localStorage.getItem('furnicraft_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'user' as const
      };

      users.push(newUser);
      localStorage.setItem('furnicraft_users', JSON.stringify(users));

      // Log the user in
      const userWithCorrectRole: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      setUser(userWithCorrectRole);
      localStorage.setItem('furnicraft_current_user', JSON.stringify(userWithCorrectRole));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('furnicraft_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
