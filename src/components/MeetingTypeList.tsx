"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
	const { toast } = useToast();
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoiningMeeting" | "isIstantMeeting" | undefined
	>();
	const router = useRouter();
	//getting the data of logged in user with the help of clerk
	const { user } = useUser();
	const client = useStreamVideoClient();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});
	const [callDetail, setCallDetail] = useState<Call>();
	const createMeeting = async () => {
		if (!user || !client) return;
		try {
			if (!values.dateTime) {
				toast({
					title: "Date and time required for  meeting",
				});
				return (
					<h1 className=" text-white  font-bold  ">
						Date and Time Required while creating a meeting
					</h1>
				);
			}
			//generating the random meeting id while creating a new meeting
			//which will act as  meeting ID
			const id = crypto.randomUUID();

			//initializing the new call object
			//It sets up the call configuration and prepares it for further actions, such as creating or retrieving a meeting.
			const call = client.call("default", id);
			if (!call) {
				throw new Error("Unable to create  a call");
			}
			// Get  the starting time of call
			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Start Instant Meeting";
			//This methods create a new call or get the call which is already created
			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description: description,
					},
				},
			});
			setCallDetail(call);
			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({
				title: "Meeting created successfully 😃",
			});
		} catch (error) {
			console.log("Error ", error);
			toast({
				title: "Error creating meeting 🥲",
			});
		}
	};
 const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
	return (
		<section className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 home-cards-container">
			<HomeCard
				img="/icons/add-meeting.svg"
				title="New Meeting"
				description="Setup a new meeting"
				classname="bg-orange-1 home-card"
				handleClick={() => setMeetingState("isIstantMeeting")}
			/>
			<HomeCard
				img="/icons/join-meeting.svg"
				title="Join Meeting"
				description="via invitation link"
				classname="bg-blue-1 home-card"
				handleClick={() => setMeetingState("isJoiningMeeting")}
			/>
			<HomeCard
				img="/icons/schedule.svg"
				title="Schedule Meeting"
				description="Plan your meeting"
				classname="bg-purple-1 home-card"
				handleClick={() => setMeetingState("isScheduleMeeting")}
			/>
			<HomeCard
				img="/icons/recordings.svg"
				title="View Recordings"
				description="Meeting recordings"
				classname="bg-yellow-1 home-card"
				handleClick={() => router.push("/recordings")}
			/>
			{!callDetail ? (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title="Schedule a Meeting for future"
					className="text-center home-card"
					buttonText="Schedule Meeting"
					handleClick={createMeeting}>
					<div className=" flex flex-col gap-3 ">
						<label
							className="text-base text-normal  leading-[22px]
					 text-purple-500 font-bold">
							{" "}
							Add a Description{" "}
						</label>
						<Textarea
							className="bg-dark-3  border-none "
							onChange={(e) => {
								setValues({ ...values, description: e.target.value });
							}}
						/>
					</div>
					<div className=" flex flex-col gap-3 ">
						<label className="text-base text-normal font-bold leading-[22px] text-purple-500 ">
							{" "}
							Select Date and Time
						</label>
						<ReactDatePicker
							selected={values.dateTime}
							onChange={(date) => {
								setValues({ ...values, dateTime: date! });
							}}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="Select Time"
							dateFormat="MMMM d ,yyyy  h:mm aa"
							className="w-full rounded bg-dark-3 p-2 focus:outline-none "
						/>
					</div>
				
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title="Start an instant meeting"
					className="text-center home-card"
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink)
						toast({
							title: "Link copied successfully",
						});
					}}
					image="/icons/checked.svg"
					buttonIcon="/icons/copy.svg"
					buttonText="Copy Meeting link "
				/>
			)}
			<MeetingModal
				isOpen={meetingState === "isIstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title="Start an instant meeting"
				className="text-center home-card"
				buttonText="Start Meeting"
				handleClick={createMeeting}
			/>
		</section>
	);
};

export default MeetingTypeList;
