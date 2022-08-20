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





const Comments = ({ comment, setComment, addComment, comments, isPostingComment, postDetails }: IProps) => {
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
            <div className='border-t-2 border-gray-200 px-2 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
                <div className='overflow-scroll lg:h-[564px]'>
                    <div className='flex items-center p-2 gap-2'>
                        <Link href={`/profile/${postDetails.postedBy._id}`}>
                            <img src={postDetails.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                        </Link>

                        <p className='flex-1 text-sm'>
                            <Link href={`/profile/${postDetails.postedBy._id}`}>
                                                <span className='font-bold cursor-pointer'>
                                                    {postDetails.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                                </span>
                            </Link>
                            {postDetails.caption}
                        </p>


                    </div>

                    {comments?.length ? (
                        comments?.map((item: IComment, idx: number) => (
                            <>
                                {allUsers?.map(
                                    (user: IUser) =>
                                        user._id === (item.postedBy._ref || item.postedBy._id) && (
                                            <div className=' p-2 items-center' key={idx}>
                                                <Link href={`/profile/${user._id}`}>
                                                    <div className='flex items-start gap-2'>
                                                        <div className='w-12 h-12 border rounded-full p-1 mr-3'>
                                                            <Image
                                                                width={48}
                                                                height={48}
                                                                className='rounded-full cursor-pointer'
                                                                src={user.image}
                                                                alt='user-profile'
                                                                layout='responsive'
                                                            />
                                                        </div>

                                                        {/*<p className='flex cursor-pointer gap-1 items-center leading-6 text-primary text-sm'>*/}
                                                        {/*    /!*{user.userName}{' '}*!/*/}
                                                        {/*    <span className='font-bold cursor-pointer'>*/}
                                                        {/*    {user.userName.replace(/\s+/g, '').toLowerCase()}{' '}*/}
                                                        {/*    <GoVerified className='text-blue-400' />*/}
                                                        {/*    </span>*/}
                                                        {/*</p>*/}


                                                        <p className='flex-1 text-sm'>
                                                            <Link href={`/profile/${user._id}`}>
                                                                <span className='font-bold cursor-pointer'>
                                                                    {user.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                                                    {/*    <GoVerified className='text-blue-400' />*/}
                                                                </span>
                                                            </Link>
                                                            {item.comment}
                                                        </p>
                                                    </div>
                                                </Link>
                                                {/*<div>*/}
                                                {/*    <p className='-mt-5 ml-16 text-[16px] mr-8'>*/}
                                                {/*        {item.comment}*/}
                                                {/*    </p>*/}
                                                {/*</div>*/}
                                            </div>
                                        )
                                )}
                            </>
                        ))
                    ):(
                        <NoResults text='No comments yet' />
                    )}
                </div>
                {userProfile &&
                    <>
                        {/*<div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10 '>*/}
                        {/*    <form onSubmit={addComment} className='flex gap-4'>*/}
                        {/*        <input*/}
                        {/*            value={comment}*/}
                        {/*            onChange={(e) => setComment(e.target.value)}*/}
                        {/*            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'*/}
                        {/*            placeholder='Add comment..'*/}
                        {/*        />*/}
                        {/*        <button className='text-md text-gray-400 '*/}
                        {/*                onClick={addComment}*/}
                        {/*        >*/}
                        {/*            {isPostingComment ? 'Commenting...' : 'Comment'}*/}
                        {/*        </button>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                    </>

                }
            </div>

            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {/*<HeartIcon className='btn' />*/}
                    <LikeButton
                                    likes={post.likes}
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

export default Comments;