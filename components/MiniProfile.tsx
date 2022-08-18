import React from 'react';
import useAuthStore from "../store/authStore";
import {GoogleLogin} from "@react-oauth/google";
const MiniProfile = () => {
    const { userProfile, addUser, removeUser }: any = useAuthStore();

    return (

        <div>
            {userProfile ? (
                <div className='flex items-center justify-between mt-14 ml-10'>
                    <img className='rounded-full border p-[2px] w-16 h-16' src={userProfile.image} alt=''/>

                    <div className='flex-1 mx-4'>
                        <h2 className='font-bold'> {userProfile.userName.replace(/\s+/g, '').toLowerCase()}{' '}</h2>
                        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
                    </div>

                    <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
                </div>
            ) : (

                <div></div>
            )}
        </div>
);
}

import {createOrGetUser} from "../utils";

export default MiniProfile;