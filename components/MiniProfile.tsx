import React from 'react';
import useAuthStore from "../store/authStore";
import {GoogleLogin} from "@react-oauth/google";
const MiniProfile = () => {
    const { userProfile, addUser, removeUser }: any = useAuthStore();

    return (

        <div>
            {userProfile ? (
                <div className='flex items-center justify-between mt-14 ml-10'>
                    <Link href={`/profile/${userProfile._id}`}>
                        <img className='rounded-full border p-[2px] w-16 h-16 cursor-pointer' src={userProfile.image} alt=''/>
                    </Link>

                    <Link href={`/profile/${userProfile._id}`}>

                        <div className='flex-1 mx-4 cursor-pointer'>
                            <h2 className='font-bold'> {userProfile.userName.replace(/\s+/g, '').toLowerCase()}{' '}</h2>
                            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
                        </div>
                    </Link>

                    <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
                </div>
            ) : (

                <div></div>
            )}
        </div>
);
}

import {createOrGetUser} from "../utils";
import Link from "next/link";

export default MiniProfile;