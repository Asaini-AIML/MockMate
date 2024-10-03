"use client"; // Ensure client-side rendering

import React, { memo } from 'react'; // Import memo for optimization
import { Button } from '../../../components/ui/button';  
import { useRouter } from 'next/navigation';

const InterviewItemCard = memo(({ interview }) => { // Use memo to prevent unnecessary renders
    const router = useRouter();

    const onStart = () => {
        router.push(`/dashboard/interview/${interview.mockId}`);
    };

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview.mockId}/feedback`);
    };

    // Function to format date to dd/mm/yyyy
    const formatDate = (date) => {
        if (!date) return 'Unknown date';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = d.getFullYear();
        return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
    };

    // Conditional rendering for loading state
    if (!interview) {
        return <div>Loading...</div>; // Show loading state if interview data is not available
    }

    return (
        <div className='border shadow-sm rounded-lg p-3' style={{
            background: "linear-gradient(90deg, rgba(0, 74, 173, 0.5), rgba(54, 143, 216, 0.5))", // Gradient for Navbar
        }}>
            <h2 className='font-extrabold text-black'>{interview.jobPosition || "Job Position Not Specified"}</h2>
            <h2 className='text-sm text-gray-600'>{interview.jobExperience || "Experience Not Specified"}</h2>
            <h2 className='text-sm text-gray-700'>Created At: {formatDate(interview.createdAt)}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>Feedback</Button>
                <Button size="sm" className="w-full" onClick={onStart}>Start Interview</Button>
            </div>
        </div>
    );
});

export default InterviewItemCard;
