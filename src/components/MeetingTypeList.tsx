"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'


const MeetingTypeList = () => {
    const[meetingState , setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isIstantMeeting'|undefined>()
    const router=useRouter();
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
    </section> 
  )
}

export default MeetingTypeList
