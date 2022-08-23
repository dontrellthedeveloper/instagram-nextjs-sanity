import React, {useEffect, useState} from 'react';
import Story from "./Story";
import useAuthStore from "../store/authStore";
import {IUser} from "../types";
import Link from 'next/link';

interface IProps {
    fetchAllUsers: () => void;
    allUsers: IUser[];
}

const Stories = () => {
    const { fetchAllUsers, allUsers } = useAuthStore();
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <div className='flex space-x-4 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300'>
            {
                allUsers?.map((user: IUser) => (


                <div key={user._id}>
                    <Link href={`/profile/${user._id}`} >
                        <img className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110
                            transition transform duration-200 ease-out' src={user.image} alt=""/>
                    </Link>
                    <Link href={`/profile/${user._id}`} >
                        <p className='text-xs w-14 truncate text-center'>{user.userName}</p>
                    </Link>
                </div>

            ))}


        </div>
    );
}

export default Stories;