"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"





const MeetingTypeList = () => {
  const { toast } = useToast()
    const[meetingState , setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isIstantMeeting'|undefined>()
    const router=useRouter();
    const {user}=useUser();
    const client= useStreamVideoClient();
    const[values , setValues]=useState({
      dateTime:new Date(),
       description:'',
       link:''
    })
    const[callDetail , setCallDetail]=useState<Call>()
    const createMeeting=async ()=>{
      if(!user  || !client )
        return;
      try {
        if(!values.dateTime)
          {
            toast({
              title:"Date and time required for  meeting"
            })
          }
        const id = crypto.randomUUID();
        const call=client.call('default',id)
        if(!call)
          {
          throw new Error("Unable to create  a call")
          }
         // Get  the starting time of call 
         const startsAt= values.dateTime.toISOString()|| new Date(Date.now()).toISOString();
         const description = values.description||"Start Instant Meeting"
         call.getOrCreate({
          data:{
            starts_at:startsAt ,
            custom:{
              description:description
            }
          }
         })
         setCallDetail(call)
         if(!values.description)
          {
            router.push(`/meeting/${call.id}`)
          }
          toast({
            title:"Meeting created successfully 😃"
          })


        
      } catch (error) {
          console.log("Error ",error)
          toast({
            title:"Error creating meeting 🥲"
          })
      }
      




    }
  return (
    <section className=' grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>


       
      <HomeCard
      img="/icons/add-meeting.svg"
      title="New Meeting"
      description="Setup a new meeting"
      classname="bg-orange-1"
      handleClick={()=>setMeetingState('isIstantMeeting')}

       />
      <HomeCard
       img="/icons/join-meeting.svg"
       title="Join Meeting"
       description="via invitation link"
       classname="bg-blue-1"
       handleClick={()=>setMeetingState('isJoiningMeeting')}/>
      <HomeCard
       img="/icons/schedule.svg"
       title="Schedule Meeting"
       description="Plan your meeting"
       classname="bg-purple-1"
       handleClick={()=>setMeetingState('isScheduleMeeting')}/>
      <HomeCard
       img="/icons/recordings.svg"
       title="View Recordings"
       description="Meeting recordings"
       classname="bg-yellow-1"
       handleClick={()=> router.push('/recordings') }/>
       <MeetingModal
       isOpen={meetingState==='isIstantMeeting'}
       onClose={()=>setMeetingState(undefined)}
       title="Start an instant meeting"
       className="text-center"
       buttonText="Start Meeting"
       handleClick={createMeeting}

       />
    </section> 
  )
}

export default MeetingTypeList
