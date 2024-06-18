import React from 'react'

//id is the  name .which is same as the dynamic route folder name which we have made( [id])
const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <div>
        Meeting Room :# {params.id}
    </div>
  )
}

export default Meeting
