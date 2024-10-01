"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
function RecordAnswerSection() {
    const [userAnswer, setUserAnswer] = useState();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(() => {
        results.map((result) => {
            setUserAnswer(prevAns=>prevAns+result.transcript)
      })}, [results]);
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 relative">
         {/* Camera Icon Image (overlapping the webcam) */}
      <div className="absolute top-0 left-0 flex justify-center w-full">
        <Image src="/camera.jpg" width={300} height={300} alt="Camera Icon" />
      </div>
      {/* Webcam Stream */}
      <Webcam
        mirrored={true}
        style={{
          height: 300,
          width: '100%',
          zIndex: 1, // Ensure webcam is below the camera icon
        }}
      />
      </div>
      <Button variant="outline" className="mt-10 mb-2"
      onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording?
        <h2 className='text-red-600'>
            <Mic/>'Recording...'
        </h2>
        :
        'Record Answer'
        }</Button>
        <Button onClick={()=>console.log(userAnswer)}>Show Answer</Button>
     
</div>
   
  );
}

export default RecordAnswerSection;
