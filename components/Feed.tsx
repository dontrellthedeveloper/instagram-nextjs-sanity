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
                            <img src={postCard.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain p-[2.5px] border border-red-500 p-1 mr-3' alt=""/>
                        </Link>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                        <p className='cursor-pointer flex-1 font-bold'>{postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}</p>
                        </Link>
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
                    <p className='px-5 pt-3 truncate'>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                            <span className='font-bold mr-1 cursor-pointer'>
                                {postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}

                            </span>
                        </Link>
                        {postCard.caption}
                    </p>




                    <FeedComments
                        postDetails={post}
                        comment={comment}
                        setComment={setComment}
                        addComment={addComment}
                        comments={post.comments}
                        isPostingComment={isPostingComment}
                    />



                    {/*<p className='px-5 py-1'>*/}
                    {/*    <Link href={`/profile/${postCard.postedBy._id}`}>*/}
                    {/*        <span className='font-bold mr-1 cursor-pointer'>*/}
                    {/*            {postCard.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}*/}

                    {/*        </span>*/}
                    {/*    </Link>*/}
                    {/*    {postCard.caption}*/}
                    {/*</p>*/}

                    {/*  comments  */}
                    {/*  input box  */}
                    {/*<form onSubmit={addComment} className='flex items-center p-4'>*/}
                    {/*    <EmojiHappyIcon className='h-7' />*/}
                    {/*    <input*/}
                    {/*        value={comment}*/}
                    {/*        onChange={(e) => setComment(e.target.value)}*/}
                    {/*        type="text" placeholder='add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>*/}
                    {/*    <button*/}
                    {/*        onClick={addComment}*/}
                    {/*        className='font-semibold text-blue-400'>{isPostingComment ? 'Commenting...' : 'Post'}</button>*/}
                    {/*</form>*/}
                </div>






            </>


    );
}





export default Feed;