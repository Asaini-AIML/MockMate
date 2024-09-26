"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from './components/ui/dialog'
 import { useState } from 'react'
  
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
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
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