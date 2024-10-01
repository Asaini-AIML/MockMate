"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "/components/ui/dialog";
import { Input } from '/components/ui/input.jsx';
import { Button } from '/components/ui/button.jsx';
import { Textarea } from '/components/ui/textarea.jsx';
import { chatSession } from '../../../utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const createdAtDate = moment().toDate();
    const router = useRouter();
    const { user } = useUser(); // Access the user information

    // Function to sanitize the JSON response
    const sanitizeJson = (jsonString) => {
        return jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading state
        console.log(jobPosition, jobDesc, jobExperience); // Debugging information

        // Prepare the input prompt for the API call
        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Job Experience: ${jobExperience}. Please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;

        try {
            const result = await chatSession.sendMessage(inputPrompt); // Use the correct chat session
            const rawResponse = await result.response.text();
            const sanitizedResponse = sanitizeJson(rawResponse); // Sanitize the response
            const mockJsonResp = sanitizedResponse.replace('```json', '').replace('```', '').trim();

           

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(mockJsonResp); // Parse the sanitized response
                console.log("Parsed Response:", parsedResponse); // Log the parsed JSON
            } catch (parseError) {
                console.error("Failed to parse JSON response:", parseError);
                console.error("Response content:", mockJsonResp); // Log the attempted JSON content
                setLoading(false);
                return; // Exit if JSON parsing fails
            }

            // Ensure user is authenticated
            if (user && user.primaryEmailAddress) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: mockJsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user.primaryEmailAddress.emailAddress, // User email
                        createdAt: createdAtDate
                    })
                    .returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", resp);
                if(resp){
                    setOpenDialog(false); // Close the dialog
                    router.push('/dashboard/interview/'+resp[0]?.mockId); // Redirect to the new interview page
                }
            } else {
                console.error("User is not authenticated. Cannot set createdBy.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false); // End loading state
        }
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center'>+ Add New Interview</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <h2>Add details about your job position/role, job description, and experience</h2>
                                <div className='my-3 mt-7'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder='Ex. Full Stack Developer' required onChange={(event) => setJobPosition(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description/Tech Stack (In Short)</label>
                                    <Textarea placeholder='Ex. React, Angular, Node.js' required onChange={(event) => setJobDesc(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Years of Experience</label>
                                    <Input placeholder='Ex. 5' type="number" max="100" required onChange={(event) => setJobExperience(event.target.value)} />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </>
                                        ) : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
