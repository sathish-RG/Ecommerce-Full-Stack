import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/features/auth/userSlice'

const UserDetailes = () => {
 const user=useSelector(selectUser)
  return (
    <div className='flex flex-col gap-2 p-3'>
      <h1 className=' font-bold text-3xl'>User Details</h1>
      {user ? (
        <div className=' flex flex-col items-center justify-center border h-[100px] w-[250px] gap-4 rounded-xl'>
       <h1 className='text-2xl font-bold'> {user.name}</h1>
        <h1> {user.email}</h1>
        </div>
      ):(<p>user not register</p>)}
    </div>
  )
}

export default UserDetailes