"use server";


import { currentUser } from "@clerk/nextjs/server";
//it is used for creating server side client 
import { StreamClient } from "@stream-io/node-sdk";

//it means code on this will only  run on server
//THis is known as server actions . (Which in react required node and express servers)
//This is the power of next js . where we can render on server as well)
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    //user coming from clerk 
	const user = await currentUser();
	if (!apiKey) {
		throw new Error("Stream api  key missing");
	}
	if (!apiSecret) {
		throw new Error("Stream api Secret  missing");
	}
	if (!user) {
		throw new Error("User not logged in");
	}
    
	const client = new StreamClient(apiKey, apiSecret);
	//after creating client we will create a user and usertoken of user who is logged in and joining meeting
	//token valid for 1 hr[]
	const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
	//time when token was created
	const issued = Math.floor(Date.now() / 1000) - 60;

	//creating the token (here  we are getting user.id from  clerk next auth )
	const token = client.createToken(user.id, exp, issued);
	return token;
};
