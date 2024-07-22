"use client"
import React, { useEffect, useState } from "react";
import { useGetCalls } from "../../hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { promises } from "dns";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
	const { endedCalls, upcomingCalls, isLoading, callRecordings } =
		useGetCalls();
		const {toast}= useToast();
	//for handling Recordings we need  State which is of type callReording that we are getting from stream SDK
	const [recordings, setRecordings] = useState<CallRecording[]>([]);
	//using router to check on which page we currently are
	const router = useRouter();
	const getCalls = () => {
		switch (type) {
			case "upcoming":
				return upcomingCalls;
			case "ended":
				return endedCalls;
			case "recordings":
				return recordings;

			default:
				return [];
		}
	};
	const getNoCallsMessage = () => {
		switch (type) {
			case "upcoming":
				return " No Upcoming meeting scheduled";
			case "ended":
				return " No Previous calls";
			case "recordings":
				return "No Recording found";

			default:
				return [];
		}
	};
	//use effect  for getting all the recordings
	useEffect(() => {
		const fetchRecordings=async()=>{
			try {
				const callData= await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()));
				const recordings=callData.filter(call => call.recordings.length>0).flatMap(call=>call.recordings);
				setRecordings(recordings);
			} catch (error) {
				 toast({title:"Try again letter"})
			}

		}
		if(type==="recordings")
			{
				fetchRecordings();
			}
		
	
	}, [type , callRecordings])
	
	const calls = getCalls();
	const noCallMessage = getNoCallsMessage();
	if(isLoading)
	{
		return <Loader/>
	}
	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2 ">
			{calls && calls.length > 0 ? (
				calls.map((meeting: Call | CallRecording) => <MeetingCard 
				key={(meeting as Call).id}
				icon={type==="ended"? '/icons/previous.svg': type==="upcoming"? '/icons/upcoming.svg':'/icons/recordings.svg'}
	title={(meeting as Call).state?.custom?.description?.substring(0 ,25)||(meeting as CallRecording)?.filename?.substring(0,20)||" No Description provided"}
	date={(meeting as Call).state?.startsAt?.toLocaleString()||(meeting as CallRecording).start_time.toLocaleString()}
	isPreviousMeeting={type==="ended"}
	buttonIcon1={type==="recordings"?'/icons/play.svg':undefined}
	handleClick={type==="recordings"?()=> router.push(`${(meeting as CallRecording).url}`): ()=> router.push(`/meeting/${(meeting as Call).id}`)}
	link={type==="recordings"?(meeting as CallRecording).url :`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
	buttonText={type==="recordings"?'Play':"Start"}
	/>)
			) : (
				<h1> {noCallMessage}</h1>
			)}
		</div>
	);
};

export default CallList;
