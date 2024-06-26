import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById=(id:string | string[])=>{
    const[call  ,setCall]=useState<Call>()
    const[isCallLoading , setIsCallLoading]=useState(true);
    //getting access to stream video client
    const client = useStreamVideoClient();
    //in useEffect we are getting the details of the call 
    useEffect(() => {
        if(!client)
            {
                return ;
            }
        const  loadedCall= async()=>{
            //filtering the calls with the help of call id that we are generating in  MeetingTypeList
            const {calls}=await client.queryCalls({
                filter_conditions:{
                    id
                }
               
            })
            if(calls.length>0)
                {
                    setCall(calls[0]);
                }


        }
       
        loadedCall();

        setIsCallLoading(false);

     
    }, [client  ,  id])
    
    return {call , isCallLoading}
  


}