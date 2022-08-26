import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from "../store/authStore";

import { IUser } from '../types';

interface IProps {
    fetchAllUsers: () => void;
    allUsers: IUser[];
}

const SuggestedAccounts = () => {
    const { fetchAllUsers, allUsers } = useAuthStore();
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);
    return (
        <>

            <div className='mt-8 ml-10'>
                <div className='flex justify-between text-sm mb-5'>
                    <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                    <button className='text-gray-600 font-semibold'>See All</button>
                </div>

                {
                    allUsers?.slice(0, 5).map((user: IUser) => (

                            <div key={user._id} className='flex items-center justify-between mt-3'>
                                <Link href={`/profile/${user._id}`} >

                                        <img className='w-10 h-10 rounded-full border border-red-500 p-0.5 cursor-pointer' src={user.image} alt=""/>
                                </Link>
                                <Link href={`/profile/${user._id}`} >
                                        <div className='flex-1 ml-4 cursor-pointer'>
                                            <div className='flex'>
                                                <h2 className='font-semibold text-sm'>{user.userName.toLowerCase().replace(/\s+/g, '')}{' '}</h2>
                                                {user.verified && (
                                                    <GoVerified className='w-3 h-3 my-auto ml-1.5  text-[#3494f4]' />
                                                )}
                                            </div>
                                            <h3 className='text-xs text-gray-400'> {user.fullName}</h3>
                                        </div>
                                </Link>


                                <button className='text-blue-400 text-xs font-bold'>Follow</button>

                            </div>

                    ))
                }
            </div>
        </>
    );
};

export default SuggestedAccounts;