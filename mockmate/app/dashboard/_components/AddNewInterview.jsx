"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog"
import { Input } from '/components/ui/input.jsx'
 import { useState } from 'react'
  import { Button } from '/components/ui/button.jsx'
  import { Textarea } from '/components/ui/textarea.jsx'
function AddNewInterview() {
    const [openDialog, setOpenDailog] = useState(false)
    const[jobPosition,setJobPosition] = useState('')
    const[jobDesc,setJobDesc] = useState('')
    const[jobExperience,setJobExperience] = useState('')

    const onSubmit=(e)=>{
        e.preventDefault();
   console.log(jobPosition,jobDesc,jobExperience)
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all' onClick={()=>setOpenDailog(true)}>
            <h2 className=' text-lg text-center'>
                + Add New Interview
            </h2>
        </div>
        <Dialog open={openDialog}>
  
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your job interviwing </DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div className=''>
          <h2>add Details about your job Position/role,job description and experience</h2>
          <div className='my-3 mt-7 '>
            <label>Job Role/Jop Position</label>
            <Input placeholder='Ex. Full Stack Devlopher' required onChange={(event)=>setJobPosition(event.target.value)}/>
          </div>
          <div className='my-3  '>
            <label>Job Description/Tech Stack (In Short)</label>
            <Textarea placeholder='Ex. React,Angular, Nodejs' required onChange={(event)=>setJobDesc(event.target.value)} />
          </div>
          <div className='my-3  '>
            <label>years of experience</label>
            <Input placeholder='Ex. 5' type="number" max="100" required onChange={(event)=>setJobExperience(event.target.value)}/>
          </div>
        </div>
        <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancle</Button>
            <Button type="submit">Start Interview</Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview