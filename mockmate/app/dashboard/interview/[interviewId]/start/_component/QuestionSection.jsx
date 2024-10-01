import React from 'react';
import classNames from 'classnames';
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert('Your browser does not support text to speech')
        }
    }
  return mockInterviewQuestion&& (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2
            className={`p-2  rounded-full text-center text-xs md:text-sm cursor-pointer md:block hidden ${
              activeQuestionIndex == index
                ? "bg-blue-700 text-white"
                : "bg-secondary"
            }`}
          >
            Question #{index + 1}
          </h2>
          ))}

      
      </div>
      <h2 className='my-5 text-md :md-text-lg '>Q: {mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} className='cursor-pointer'/>
      <div className='border rounded p-5 bg-blue-100 my-10 mt-20'>
        <h2 className='flex gap-2 item center text-blue-700'>
            <Lightbulb/>
            <strong>Note</strong>
        </h2>
        <h2 className='text-sm text-blue-400 my-3'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it</h2>
      </div>
    </div>
    
  );
}

export default QuestionSection;
