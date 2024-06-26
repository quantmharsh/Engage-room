"use client"
import { useUser } from "@clerk/nextjs";
import {
	StreamCall,
	StreamVideo,
	StreamVideoClient,
	User,
} from "@stream-io/video-react-sdk";

import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "../actions/stream.actions";
import { Loader } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
	const [videoClient, SetVideoClient] = useState<StreamVideoClient>();
	//useUser  we are getting it from clerk
	const { user, isLoaded } = useUser();
	useEffect(() => {
		if (!user || !isLoaded) return;
		if (!apiKey) {
			throw new Error("Stream API key missing");
		}
		//creating the   new stream video  client to connect in meeting . with the help of clerk
		//passing options object in it 
		const client = new StreamVideoClient({
			apiKey,
			user: {
				id: user?.id,
				name: user?.username || user?.id,
				image: user?.imageUrl,
			},
			//  we are etting token provider from actions folder  (it is used to verify the user logged in to the user who joins the meeting)
			tokenProvider: tokenProvider,
		});
        SetVideoClient(client) 
	}, [user, isLoaded]);
    if(!videoClient)
        {
            return <Loader/>
        }

	return (
		//wrapping our entire application with StreamVideo . same we did with clerk also
		<StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
	);
};
