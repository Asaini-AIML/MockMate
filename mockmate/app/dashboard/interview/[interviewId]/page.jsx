"use client";
import React, { use, useEffect, useState } from 'react'
import { MockInterview } from '../../../../utils/schema';
import { db } from '../../../../utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '/components/ui/button';

function Interview({params}) {
    const [interviewData, setInterviewData] = useState();
    const[webCamEnabled,setWebCamEnabled]=useState(false);
    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetail()
    },[])
    /**
     * Get Interview Detail by mockId
     */
    const GetInterviewDetail=async()=>{ 
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
      
        
        setInterviewData(result[0])
    }
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's Get Started </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      
        <div className='flex flex-col my-5 gap-5 '>
            <div className='p-5 rounded-lg border'>
            <h2 className='text-lg'>
                <strong>Job Role/Job Position : </strong>{ interviewData?.jobPosition} 
            </h2>
            <h2 className='text-lg'>
                <strong>Job Decription/Tech Stack : </strong>{ interviewData?.jobDesc} 
            </h2>
            <h2 className='text-lg'>
                <strong>Years of Experience : </strong>{ interviewData?.jobExperience} 
            </h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                <h2 className='flex gap-2 item-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
        </div>
       {/* Web Cam */}
        <div className='flex flex-col items-center '>
        {webCamEnabled?<Webcam 
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
         style={{
            height: 300,
            width: 300,
            
        }}/>:
        <>
        <WebcamIcon className='h-72 w-full my-7 p-10 bg-secondary rounded-lg border '/>
        <Button  className='mt-5 font-bold text-lg' variant="ghost" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam And MicroPhone </Button>
       
        </>
}
        </div>
        </div>
        <div className='flex justify-end mt-10'>
                <Button className='font-bold text-lg'>Start Interview</Button>
            </div>
    </div>
  )
}

export default Interview