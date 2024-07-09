"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const router= useRouter();
     const call= useCall();
     const  {useLocalParticipant}=useCallStateHooks();
     const localParticipant= useLocalParticipant();
     const isMeetingOwner=call?.state.createdBy  && localParticipant && call?.state.createdBy.id===localParticipant.userId 
     if(!isMeetingOwner)
     {
        return null;
     }
  return (
    
    <Button   onClick={ async()=>{
         await call.endCall()
         router.push('/')
    }}
    className=' bg-purple-600' > End Call for Everyone </Button>
  )
}

export default EndCallButton
