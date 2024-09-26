"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "/components/ui/dialog"
import { Input } from '/components/ui/input.jsx'
import { Button } from '/components/ui/button.jsx'
import { Textarea } from '/components/ui/textarea.jsx'
import { chatSession } from '../../../utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'


function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [jobExperience, setJobExperience] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async (e) => {
      setLoading(true);
      e.preventDefault(); // Prevent default form submission
      console.log(jobPosition, jobDesc, jobExperience); // Debugging information

      // Prepare the input prompt for the API call
      const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Job Experience: ${jobExperience}. Please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;

      try {
          // Send the message to the 
         
          const result = await chatSession.sendMessage(inputPrompt); // Use the correct chat session
          const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
          console.log(JSON.parse(MockJsonResp)); // Output the response from the API
         setLoading(false);
          // Set the generated questions in state
          setGeneratedQuestions(result.response.text());
      } catch (error) {
          console.error("Error generating interview questions:", error);
          // Handle error gracefully
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
                                    <Button type="submit" disable={loading}>
                                      {loading ?
                                      <>
                                      <LoaderCircle className='animate-spin'/>'Generating from AI'
                                      </>:'Start Interview ' }
                                      Start Interview</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;
