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
function AddNewInterview() {
    const [openDialog, setOpenDailog] = useState(false)
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
        <div className=''>
          <h2>add Details about your job Position/role,job description and experience</h2>
          <div className='my-2 mt-7 '>
            <label>Job Role/Jop Position</label>
            <Input placeholder='Ex. Full Stack Devlopher'/>
          </div>
        </div>
        <div className='flex gap-5 justify-end'>
            <Button variant="ghost" onClick={()=>setOpenDailog(false)}>Cancle</Button>
            <Button>Start Interview</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview