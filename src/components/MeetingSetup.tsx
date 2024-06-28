'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

//In this component we are preparing our camera and  microphone for meeting


const MeetingSetup = () => {
  
const[isMicCamToggleOn , setIsMicCamToggleOn]=useState(false);
//getting the call details that we  are joining 
const  call=  useCall();
console.log("Call data" ,call)
if(!call)
  {
    console.log("Error in call ")
    throw new Error("Use call must be used inside  streamCall component")
    
  }
useEffect(() => {

 if(isMicCamToggleOn)
  {
    call?.camera.disable();
    call?.microphone.disable();
    }
    else{
      call?.camera.enable();
      call?.microphone.enable();
    }
}, [isMicCamToggleOn , call?.camera , call?.microphone])
  return (
    <div className='flex  h-screen w-full flex-col items-center justify-center  gap-3 text-white '>
      <h1 className=' text-2xl  font-bold '> Setup</h1>
       <VideoPreview/>
       <div className='flex  h-16 items-center gap-3  justify-center '>
        <label className=' flex items-center justify-center gap-2 font-medium'>
          <input className='flex text-bold '
          type='checkbox'
          checked={isMicCamToggleOn}
          onChange={(e)=>setIsMicCamToggleOn(e.target.checked) }  />
          Join with Mic and  camera off 
        </label>
        <DeviceSettings/>
        
       </div>
    </div>
  )
}

export default MeetingSetup
