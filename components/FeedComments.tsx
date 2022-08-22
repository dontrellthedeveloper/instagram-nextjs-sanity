import React, {Dispatch, SetStateAction, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import {igImage, IUser} from '../types';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";
import LikeButton from "./LikeButton";
import axios from "axios";
import {BASE_URL} from "../utils";


interface IProps {
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: IComment[];
    postDetails: igImage;
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}





const FeedComments = ({ comment, setComment, addComment, comments, isPostingComment, postDetails }: IProps) => {
    const { userProfile, allUsers }: any = useAuthStore();
    const [post, setPost] = useState(postDetails);


    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPost({ ...post, likes: data.likes });
        }
    };

    return (
        <>
                     {comments?.length && (
                    <Link href={`/detail/${postDetails._id}`}>
                        <h3 className='cursor-pointer px-5 py-3 text-sm text-gray-400'> View all {postDetails.comments?.length || 0} comments</h3>
                    </Link>
                     )}

                    {comments?.length ? (

                        comments?.slice(0, 2).map((item: IComment, idx: number) => (
                            <>

                                {allUsers?.map(
                                    (user: IUser) =>
                                        user._id === (item.postedBy._ref || item.postedBy._id) && (



                                            <p key={idx} className='px-5 py-1'>
                                                <Link href={`/profile/${user._id}`}>
                                                    <span className='font-bold mr-1 cursor-pointer'>
                                                        {user.userName.replace(/\s+/g, '').toLowerCase()}{' '}

                                                    </span>
                                                </Link>
                                                {item.comment}
                                            </p>


                                        )
                                )}
                            </>
                        ))
                    ):(
                        <></>
                    )}



            <form onSubmit={addComment} className='flex items-center p-4'>
                <EmojiHappyIcon className='h-7' />
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text" placeholder='add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>
                <button
                    onClick={addComment}
                    className='font-semibold text-blue-400'>{isPostingComment ? 'Commenting...' : 'Post'}</button>
            </form>
        </>
    );
};

export default FeedComments;