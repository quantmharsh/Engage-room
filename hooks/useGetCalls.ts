import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
	//store all the calls of logged in user
	const [calls, setCalls] = useState<Call[]>([]);
	//state to check whether all calls or fetched or not
	const [isLoading, SetIsLoading] = useState(false);
	//getting logged in user using clerk
	const { user } = useUser();
	//getting stream client
	const client = useStreamVideoClient();

	useEffect(() => {
		//async method to get all calls
		const loadCalls = async () => {
			if (!client || !user?.id) {
				return;
			}
			SetIsLoading(true);
			try {
				const { calls } = await client.queryCalls({
					sort: [{ field: "starts_at", direction: -1 }],
					filter_conditions: {
						starts_at: { $exists: true },
						$or: [
							{ created_by_user_id: user?.id },
							{ members: { $in: [user?.id] } },
						],
					},
				});
                setCalls(calls);
			} catch (error) {
				console.log(error);
			} finally {
				SetIsLoading(false);
			}
		};
		loadCalls();
	}, [client, user?.id]);
   const now=  new Date();
     const endedCalls =calls.filter(({state: { startsAt , endedAt}}:Call)=>{
          return ( startsAt &&  new Date(startsAt)<now || !!endedAt )
     }) ;
     const upcomingCalls=calls.filter(({state:{startsAt}}:Call)=>{
        return (startsAt && new Date(startsAt)>now)
     }) ;
     return {
        endedCalls , 
        upcomingCalls ,
        callRecordings:calls, 
        isLoading
     }
};
