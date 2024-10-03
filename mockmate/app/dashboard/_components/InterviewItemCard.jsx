import React from 'react'
import {Button} from '../../../components/ui/button';  

import { useRouter } from 'next/navigation';
function InterviewItemCard({ interview }) {
    const router =useRouter();
    const onStart=()=>{
        router.push(`/dashboard/interview/${interview.mockId}`)
    }
    const onFeedback=()=>{
        router.push(`/dashboard/interview/${interview.mockId}/feedback`)

    }
  // Function to format date to dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Get day and pad if necessary
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
  };

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-600'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience}</h2>
      <h2 className='text-sm text-gray-500'>CreatedAt: {formatDate(interview?.createdAt)}</h2>
      <div className='flex justify-between mt-2 gap-5'>
     
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback} >Feedback</Button>
        <Button size="sm" className="w-full" onClick={onStart}>Start Interview</Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
