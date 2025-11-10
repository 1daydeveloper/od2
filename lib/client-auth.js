// lib/client-auth.js
'use client';

// Simple admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'od2admin123'
};

export const clientAuth = {
  // Check if user is authenticated
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const authData = localStorage.getItem('od2_admin_auth');
    if (!authData) return false;
    
    try {
      const { token, expiry } = JSON.parse(authData);
      return Date.now() < expiry;
    } catch {
      return false;
    }
  },

  // Login with username/password
  login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const authData = {
        token: btoa(Math.random().toString(36)),
        expiry: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        username: username
      };
      localStorage.setItem('od2_admin_auth', JSON.stringify(authData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  // Logout
  logout() {
    localStorage.removeItem('od2_admin_auth');
  },

  // Get current user
  getCurrentUser() {
    if (!this.isAuthenticated()) return null;
    try {
      const authData = JSON.parse(localStorage.getItem('od2_admin_auth'));
      return { username: authData.username };
    } catch {
      return null;
    }
  },

  // Quick login with prompt
  quickLogin() {
    const password = prompt('Enter admin password:');
    return this.login('admin', password || '');
  }
};