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
                     <HeroIconSolid onClick={handleDislike} className='btn text-[#f04c54]' />
             ) : (
                     <HeartIcon onClick={handleLike} className='btn' />
             )}
        </>
    );
};

export default LikeButton;