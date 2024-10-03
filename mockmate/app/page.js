// pages/index.js
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/dashboard'); // Navigate to dashboard page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <button
        onClick={navigateToDashboard}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Home;
