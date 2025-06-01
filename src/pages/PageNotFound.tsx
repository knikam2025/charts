import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const PageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <Activity size={64} className="mx-auto text-blue-600" />
        <h1 className="text-4xl font-bold mt-4 text-gray-800">404</h1>
        <p className="text-xl mt-2 text-gray-600">Page Not Found</p>
        <p className="mt-4 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/dashboard" 
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;