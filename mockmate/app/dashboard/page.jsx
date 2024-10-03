import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
   
      <div className='p-10'>
        <h2 className='font-extrabold text-3xl text-black'>Dashboard</h2>
        <h3 className='text-gray-700 mb-6'>Create and Start your AI Mockup Interview</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-3'>
          <AddNewInterview />
        </div>

        {/* Previous Interview List */}
        <InterviewList />
      </div>
    
  );
}

export default Dashboard;
