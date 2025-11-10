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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">🔐 Admin Access</h2>
            <p className="mt-2 text-gray-600">Enter admin password to continue</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter admin password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
              
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Quick Login (Browser Prompt)
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>💡 Default password: <code className="bg-gray-100 px-2 py-1 rounded">od2admin123</code></p>
            <p>Session expires in 24 hours</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">🛠️ OD2 Admin Panel</span>
          <span className="text-blue-200">|</span>
          <span className="text-blue-200">Welcome, {clientAuth.getCurrentUser()?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Protected Content */}
      {children}
    </div>
  );
}