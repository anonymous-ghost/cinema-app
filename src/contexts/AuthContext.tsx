import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// User interface
interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// Mock users data with clear admin and regular user accounts
const MOCK_USERS: User[] = [
  {
    id: "user1",
    email: "user@example.com",
    name: "Regular User",
    role: 'user'
  },
  {
    id: "admin1",
    email: "admin@example.com",
    name: "Admin User",
    role: 'admin'
  }
];

// Store mock passwords (in a real app, these would be hashed and stored on the server)
const MOCK_PASSWORDS: Record<string, string> = {
  "user@example.com": "user123",
  "admin@example.com": "admin123"
};

// Interface for the context
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For now, we'll just check against our mock data
    const user = MOCK_USERS.find(u => u.email === email);
    
    // Check if user exists and password matches
    if (user && MOCK_PASSWORDS[email] === password) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // In a real app, this would be an API call to create a user
    const newUser: User = {
      id: `user${MOCK_USERS.length + 1}`,
      email,
      name,
      role: 'user' // All new registrations are regular users by default
    };

    // Add to mock users (in a real app, this would be handled by the backend)
    MOCK_USERS.push(newUser);
    
    // Store the password (in a real app, this would be hashed and stored on the server)
    MOCK_PASSWORDS[email] = password;
    
    // Log in the new user
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      isAdmin,
      login, 
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 