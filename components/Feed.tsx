import React, {Dispatch, SetStateAction, useState} from 'react';
import {NextPage} from 'next';
import Stories from "./Stories";
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

import {igImage, IUser} from '../types';
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
import NoResults from "./NoResults";
import Image from "next/image";
import Comments from "./Comments";
import FeedComments from "./FeedComments";
import {GoVerified} from "react-icons/go";



interface IProps {
    post: igImage;
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: IComment[];
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}

const Feed: NextPage<IProps> = ({post, comments}) => {
    const { userProfile, allUsers }: any = useAuthStore();
    const [postCard, setPostCard] = useState(post);
    const [comment, setComment] = useState<string>('');
    const [isPostingComment, setIsPostingComment] = useState<boolean>(false);




    const addComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (userProfile) {
            if (comment) {
                setIsPostingComment(true);
                const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                    userId: userProfile._id,
                    comment,
                });

                setPostCard({ ...post, comments: res.data.comments });
                setComment('');
                setIsPostingComment(false);
            }
        }
    };

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
                            <img src={postCard.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain p-[2.5px] border border-red-500 p-0.5 mr-3' alt=""/>
                        </Link>

                        <p className='flex-1 '>
                            <div className='flex'>
                                <Link href={`/profile/${postCard.postedBy._id}`}>
                                    <span className='cursor-pointer font-bold'>
                                        {postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                    </span>
                                </Link>
                                {postCard.postedBy.verified && (
                                <GoVerified className='w-3.5 h-3.5 my-auto ml-1.5  text-[#3494f4]' />
                                )}
                            </div>


                        </p>



                        <DotsHorizontalIcon className='h-5'/>
                    </div>



                    {/*  img  */}

                        <img src={postCard.image?.asset?.url} className='object-cover w-full' alt=''/>

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

                    <p className='px-5 pt-5 truncate font-bold'>
                        {postCard.likes?.length == 1 ? (
                            <>
                                {postCard.likes?.length || 0} like
                            </>
                        ) : (
                            <>
                                {postCard.likes?.length || 0} likes
                            </>
                        )}

                    </p>

                    {/*  caption  */}
                    <p className='px-5 pt-3 truncate ...'>
                        <div className='flex'>

                            <Link href={`/profile/${postCard.postedBy._id}`}>
                                <span className='font-bold mr-1.5 cursor-pointer'>
                                    {postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}

                                </span>
                            </Link>
                            {postCard.postedBy.verified && (
                                <GoVerified className='w-3.5 h-3.5 mr-1.5 my-auto text-[#3494f4]' />
                            )}
                            <span className='truncate'>
                                {postCard.caption}
                            </span>
                        </div>
                    </p>




                    <FeedComments
                        postDetails={post}
                        comment={comment}
                        setComment={setComment}
                        addComment={addComment}
                        comments={post.comments}
                        isPostingComment={isPostingComment}
                    />

                </div>






            </>


    );
}





export default Feed;