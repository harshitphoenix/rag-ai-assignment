import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200">404</p>
        <h1 className="text-xl font-semibold text-gray-700 mt-3">Page not found</h1>
        <p className="text-sm text-gray-400 mt-1">The page you're looking for doesn't exist.</p>
        <Link
          to="/dashboard"
          className="inline-block mt-5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
