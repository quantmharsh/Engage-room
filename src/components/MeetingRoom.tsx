import { cn } from "@/lib/utils";
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallStats,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutIcon, User, User2, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";


const MeetingRoom = () => {
	type CallLayoutType = "grid" | "speaker-right" | "speaker-left";
	const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
	
	// check whether this meeting room is created by logged in user or  they have joined it as  a  guest through a link
	const searchParamas= useSearchParams();
	const isPersonalRoom = !!searchParamas.get('personal')
	 //calling state to check whether we have joined the meeting or not
	 const { useCallCallingState}=useCallStateHooks();
	 const  callingState= useCallCallingState();
	 const [showParticipants, setShowParticipants] = useState(true);
	 if(callingState !== CallingState.JOINED)
	 {
		return <Loader/>
	 }


		

	const CallLayout = () => {
		switch (layout) {
			case "grid":
				return <PaginatedGridLayout />;

			case "speaker-left":
				return <SpeakerLayout participantsBarPosition="right" />;

			case "speaker-right":
				return <SpeakerLayout participantsBarPosition="left" />;

			default:
				return <PaginatedGridLayout />;
		}
	};
	

	return (
		<section className="relative  h-screen w-full pt-4 overflow-hidden text-white ">
			<div className=" relative flex size-full items-center justify-center  ">
				<div className=" flex size-full max-w-[1000px]  items-center">
					<CallLayout />
				</div>
				{/* Div for rendering all the participants */}
				<div
					className={cn(" h-[calc(100vh-86)px] hidden  ml-2 ", {
						"show-block": showParticipants,
					})}>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
				
			</div>
			{/* Video layout and  call controls */}
			<div className=" fixed bottom-0  flex w-full justify-center items-center   gap-5  flex-wrap ">
				<CallControls />
				<DropdownMenu>
					<div className="flex  items-center">
						<DropdownMenuTrigger className="cursor-pointer px-4 py-2 bg-[#19232d] hover:bg-[#4c535b] rounded-2xl ">
							<LayoutIcon className="text-white" size={22} />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="border-dark-1  bg-dark-1  text-[#F8F8FF]  font-semibold ">
						{["Grid", "Speaker-left", "Speaker-right"].map((item, index) => (
							<div key={index}>
								<DropdownMenuItem
									className=" cursor-pointer"
									onClick={() => {
										setLayout(item.toLowerCase() as CallLayoutType);
									}}>
									
									{item}
								</DropdownMenuItem>
								<DropdownMenuSeparator className="border-dark-1 " />
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				{/*  to show all the call stats such as latency. this is coming from streamSdk */}
				<CallStatsButton />
				<button className="cursor-pointer px-4 py-2 bg-[#19232d] hover:bg-[#4c535b] rounded-2xl" onClick={()=> {
					setShowParticipants((prev)=>!prev)
				}}>
					<Users size={20}  className=" text-purple-400" />
				</button>

				{!isPersonalRoom  &&(
					<EndCallButton/>
				)}
			</div>
		</section>
	);
};

export default MeetingRoom;
