// Higher-Order Component for Protected Routes
// src/utils/hoc/withAuth.js

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * HOC to protect routes that require authentication
 * @param {React.Component} Component - Component to protect
 * @param {Object} options - Options for protection
 * @param {string} options.requiredRole - Required user role ('admin', 'customer', 'vendor')
 * @param {string} options.redirectTo - Redirect path if not authorized
 */
export const withAuth = (Component, options = {}) => {
  return function ProtectedRoute(props) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const { requiredRole, redirectTo = '/auth/login' } = options;

    useEffect(() => {
      if (!loading) {
        // Not authenticated
        if (!isAuthenticated) {
          router.push(redirectTo);
          return;
        }

        // Check role if required
        if (requiredRole && user?.role !== requiredRole) {
          router.push('/403'); // Forbidden
          return;
        }
      }
    }, [user, loading, isAuthenticated, router]);

    // Show loading state
    if (loading) {
      return (
        <div className="loading-wrapper">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // Not authenticated
    if (!isAuthenticated) {
      return null;
    }

    // Not authorized (wrong role)
    if (requiredRole && user?.role !== requiredRole) {
      return null;
    }

    // Render component
    return <Component {...props} />;
  };
};

/**
 * HOC specifically for admin routes
 */
export const withAdminAuth = (Component) => {
  return withAuth(Component, {
    requiredRole: 'admin',
    redirectTo: '/auth/login'
  });
};

/**
 * HOC specifically for customer routes
 */
export const withCustomerAuth = (Component) => {
  return withAuth(Component, {
    requiredRole: 'customer',
    redirectTo: '/auth/login'
  });
};

