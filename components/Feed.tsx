import React, {useState} from 'react';
import {NextPage} from 'next';
import Stories from "./Stories";
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

import { igImage } from '../types';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";
import Link from "next/link";
import LikeButton from "./LikeButton";
import axios from "axios";
import {BASE_URL} from "../utils";
import useAuthStore from "../store/authStore";



interface IProps {
    post: igImage
}

const Feed: NextPage<IProps> = ({post}) => {
    const { userProfile, allUsers }: any = useAuthStore();
    const [postCard, setPostCard] = useState(post);

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPostCard({ ...post, likes: data.likes });
        }
    };

    return (
            <>
                <div className='bg-white my-7 border rounded-sm'>
                    {/* Header */}
                    <div className='flex items-center p-5'>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                            <img src={postCard.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                        </Link>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                        <p className='cursor-pointer flex-1 font-bold'>{postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}</p>
                        </Link>
                        <DotsHorizontalIcon className='h-5'/>
                    </div>



                    {/*  img  */}
                    <Link href={`/detail/${postCard._id}`}>
                        <img src={postCard.image?.asset?.url} className='object-cover w-full' alt=''/>
                    </Link>
                    {/*  Button  */}
                    <div className='flex justify-between px-4 pt-4'>
                        <div className='flex space-x-4'>
                            {/*<HeartIcon className='btn' />*/}
                            <LikeButton
                                likes={postCard.likes}
                                flex='flex'
                                handleLike={() => handleLike(true)}
                                handleDislike={() => handleLike(false)}
                                // likes={} flex={} handleLike={} handleDislike={}
                            />
                            <ChatIcon className='btn' />
                            <PaperAirplaneIcon className='btn' />
                        </div>
                        <BookmarkIcon className='btn' />
                    </div>
                    {/*  caption  */}
                    <p className='p-5 truncate'>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                            <span className='font-bold mr-1 cursor-pointer'>
                                {postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}

                            </span>
                        </Link>
                        {postCard.caption}
                    </p>
                    {/*  comments  */}
                    {/*  input box  */}
                    <form className='flex items-center p-4'>
                        <EmojiHappyIcon className='h-7' />
                        <input type="text" placeholder='add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>
                        <button className='font-semibold text-blue-400'>Post</button>
                    </form>
                </div>






            </>


    );
}

export default Feed;