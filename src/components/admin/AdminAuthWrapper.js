'use client';

import { useState, useEffect } from 'react';
import { clientAuth } from '../../../lib/client-auth';

export default function AdminAuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: 'admin', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const authenticated = clientAuth.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
      if (!authenticated) {
        setShowLogin(true);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const result = clientAuth.login(credentials.username, credentials.password);
    if (result.success) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setCredentials({ username: 'admin', password: '' });
    } else {
      setError(result.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    clientAuth.logout();
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const handleQuickLogin = () => {
    const result = clientAuth.quickLogin();
    if (result.success) {
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setError(result.message || 'Login failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">🔐 Admin Access</h2>
            <p className="mt-2 text-muted-foreground">Enter admin password to continue</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Sign In
              </button>
              
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full flex justify-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Quick Login (Browser Prompt)
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>💡 Default password: <code className="bg-muted px-2 py-1 rounded text-foreground text-xs">od2admin123</code></p>
            <p>Session expires in 24 hours</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center border-b border-border">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold">🛠️ OD2 Admin Panel</span>
          <span className="text-primary-foreground/70">|</span>
          <span className="text-primary-foreground/90">Welcome, {clientAuth.getCurrentUser()?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-1 rounded text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Protected Content */}
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </div>
  );
}