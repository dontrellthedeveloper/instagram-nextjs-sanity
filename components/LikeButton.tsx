import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';
import {HeartIcon} from "@heroicons/react/outline";
import {HeartIcon as HeroIconSolid} from '@heroicons/react/solid'

interface IProps {
    likes: any[];
    flex: string;
    handleLike: () => void;
    handleDislike: () => void;
}

const LikeButton = ({ handleLike, handleDislike, likes}: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();
    let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes, likes]);

    return (
        <>
                    {alreadyLiked ? (
                        // <div className='bg-primary bg-gray-300 rounded-full p-2 md:p-4 text-[#F51997]' onClick={handleDislike} >
                             <HeroIconSolid onClick={handleDislike} className='btn text-[#f04c54]' />
                        // </div>
                     ) : (
                         // <div className='bg-primary bg-gray-300 rounded-full p-2 md:p-4 ' onClick={handleLike} >
                             <HeartIcon onClick={handleLike} className='btn' />
                         // </div>
                     )}
        </>
        // <div className={`gap-6`}>
        //     <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        //         {alreadyLiked ? (
        //             <div className='bg-primary bg-gray-300 rounded-full p-2 md:p-4 text-[#F51997]' onClick={handleDislike} >
        //                 <MdFavorite className='text-lg md:text-2xl' />
        //             </div>
        //         ) : (
        //             <div className='bg-primary bg-gray-300 rounded-full p-2 md:p-4 ' onClick={handleLike} >
        //                 <MdFavorite className='text-lg md:text-2xl' />
        //             </div>
        //         )}
        //         <p className='text-sm font-semibold '>{likes?.length || 0}</p>
        //     </div>
        // </div>
    );
};

export default LikeButton;