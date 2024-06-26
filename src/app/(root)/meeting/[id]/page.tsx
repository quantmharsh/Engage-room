'use client'
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { useGetCallById } from '../../../../../hooks/useGetCallById';
import Loader from '@/components/Loader';

//id is the  name .which is same as the dynamic route folder name which we have made( [id])
const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const{user , isLoaded}=useUser();
  //setup the audio and video permission 
  const[isSetupComplete , setIsSetupComplete]=useState(false)
  const{call , isCallLoading} = useGetCallById(id);
   if(isCallLoading ||!isLoaded) return <Loader/>
  return (
    <main>
      {/* call ={call} means  getting the details of the call in which we are in  */}
        <StreamCall call={call}>
          <StreamTheme>
            { !isSetupComplete ?<MeetingSetup/>: <MeetingRoom/>}

          </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default Meeting
