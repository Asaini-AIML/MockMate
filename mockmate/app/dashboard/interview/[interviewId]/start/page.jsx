"use client";
import React, {useState,  useEffect } from 'react'
import { db } from '../../../../../utils/db'
import { MockInterview } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Question from './_component/QuestionSection'
import RecordAnswerSection from './_component/RecordAnswerSection'
function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
    useEffect(() => {
        GetInterviewDetail();
    }, [])
    /**
     * Get Interview Detail by mockId
     */
    const GetInterviewDetail=async()=>{ 
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
      
      const jsonMockResp=JSON.parse(result[0].jsonMockResp)
      console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0])
    }

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        {/*Question Section */}
    <Question mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
        {/*Video Section */}
      <RecordAnswerSection/>
    </div>
  )
}

export default StartInterview;