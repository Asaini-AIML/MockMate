"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '../../../../../../utils/GeminiAiModel';
import { db } from '../../../../../../utils/db';
import { UserAnswer } from '../../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';  // Ensure you import this if you use moment for date handling

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const createdAtDate = moment().toDate();
    const [loading, setLoading] = useState(false);  // Fix destructuring
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    // Effect to update userAnswer when results are available
    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer((prevAns) => prevAns + result.transcript);
        });
    }, [results]);

    // Handle start and stop of recording
    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer(''); // Reset userAnswer when recording starts
            startSpeechToText();
        }
    };

    // Function to update the user's answer in the DB
   const UpdateUserAnswer = async () => {
    setLoading(true);

    // Create a feedback prompt based on the user's answer
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and user's answer, please give us a rating and feedback for improvement in 3 to 5 lines in JSON format with "rating" and "feedback" fields.`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();
    console.log("AI Feedback Response:", mockJsonResp);

    try {
        // Parse the AI feedback response
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        // Insert the answer into the database with the correct fields
        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,  // mockId reference
            Question: mockInterviewQuestion[activeQuestionIndex]?.question,  // Question
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,  // Correct Answer (mapped correctly)
            UserAns: userAnswer,  // User's Answer (mapped correctly)
            feedback: JsonFeedbackResp?.feedback,  // AI feedback
            rating: JsonFeedbackResp?.rating,  // AI rating
            userEmail: user?.primaryEmailAddress?.emailAddress,  // User's email
            createdAt: createdAtDate,  // Created at timestamp
        });

        if (resp) {
            toast.success('Answer Recorded Successfully');
            setUserAnswer('');
            setResults([]);
        }
    } catch (error) {
        console.error("Error parsing JSON feedback response:", error);
        toast.error('Failed to parse feedback.');
    }

    // Reset user answer state and loading flag
   
    setResults([]);
    setLoading(false);
};


    // Ensure that UpdateUserAnswer is called after stopping the recording
    useEffect(() => {
        if (!isRecording && userAnswer?.length >= 5) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer]);

    return (
        <div className='flex items-center justify-center flex-col '>
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
            <Button disabled={loading} variant="outline" className="mt-5 mb-2"
                onClick={StartStopRecording}  // Corrected handler
            >
                {isRecording ?
                    <h2 className='text-red-600 flex text-xl font-sans'>
                        <StopCircle /> Recording...
                    </h2>
                    :
                    <h2 className='flex items-center justify-between gap-1 text-blue-300 text-xl font-sans'>
                        <Mic />
                        Record Answer
                    </h2>
                }
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
