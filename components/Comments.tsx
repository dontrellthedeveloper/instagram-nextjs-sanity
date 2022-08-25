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
                <div className='overflow-scroll lg:h-[520px]'>
                    <div className='flex items-center p-2 gap-2'>
                        <Link href={`/profile/${postDetails.postedBy._id}`}>
                            <img src={postDetails.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain border border-red-500 p-0.5 mr-3' alt=""/>
                        </Link>

                        <p className='flex-1 text-sm'>
                            <div className='flex'>
                                <Link href={`/profile/${postDetails.postedBy._id}`}>
                                    <span className='font-bold cursor-pointer mr-1.5'>
                                        {postDetails.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                    </span>
                                </Link>
                                {postDetails.postedBy.verified && (
                                    <GoVerified className='w-3 h-3 my-auto mr-1.5 text-[#3494f4]' />
                                )}
                                {postDetails.caption}
                            </div>
                        </p>


                    </div>

                    {comments?.length ? (
                        comments?.map((item: IComment, idx: number) => (
                            <>
                                {allUsers?.map(
                                    (user: IUser) =>
                                        user._id === (item.postedBy._ref || item.postedBy._id) && (
                                            <div className=' p-2 items-center' key={idx}>

                                                    <div className='flex items-start gap-2'>
                                                        <Link href={`/profile/${user._id}`}>
                                                        <div className='w-12 h-12 border border-red-500 rounded-full p-0.5 mr-3'>
                                                            <Image
                                                                width={48}
                                                                height={48}
                                                                className='rounded-full cursor-pointer'
                                                                src={user.image}
                                                                alt='user-profile'
                                                                layout='responsive'
                                                            />
                                                        </div>
                                                        </Link>
                                                        <p className='flex-1 text-sm'>
                                                            <div className='flex'>

                                                                <Link href={`/profile/${user._id}`}>
                                                                    <span className='font-bold cursor-pointer mr-1.5'>
                                                                        {user.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                                                        {/*    <GoVerified className='text-blue-400' />*/}
                                                                    </span>
                                                                </Link>
                                                                {user.verified && (
                                                                <GoVerified className='w-3 h-3 mt-1 mr-1.5 text-[#3494f4]' />
                                                                )}
                                                                {item.comment}
                                                            </div>
                                                        </p>
                                                    </div>

                                            </div>
                                        )
                                )}
                            </>
                        ))
                    ):(
                        <NoResults text='No comments yet' />
                    )}
                </div>
            </div>

            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    <LikeButton
                                    likes={post.likes}
                                    flex='flex'
                                    handleLike={() => handleLike(true)}
                                    handleDislike={() => handleLike(false)}
                    />
                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn' />
                </div>
                <BookmarkIcon className='btn' />
            </div>

            <p className='px-5 pt-5 truncate font-bold'>
                {post.likes?.length == 1 ? (
                    <>
                        {post.likes?.length || 0} like
                    </>
                ) : (
                    <>
                        {post.likes?.length || 0} likes
                    </>
                )}

            </p>

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