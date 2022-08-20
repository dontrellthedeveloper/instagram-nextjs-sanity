import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { BASE_URL } from '../../utils';
import { igImage } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

import Header from "../../components/Header";
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

interface IProps {
    postDetails: igImage;
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [playing, setPlaying] = useState<boolean>(false);
    const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

    const { userProfile }: any = useAuthStore();

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const [comment, setComment] = useState<string>('');
    const [isPostingComment, setIsPostingComment] = useState<boolean>(false);




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



    const addComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (userProfile) {
            if (comment) {
                setIsPostingComment(true);
                const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                    userId: userProfile._id,
                    comment,
                });

                setPost({ ...post, comments: res.data.comments });
                setComment('');
                setIsPostingComment(false);
            }
        }
    };




    const onVideoClick = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    };

    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [post, isVideoMuted]);






    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <Header/>

            <div className='max-w-7xl mt-16 items-center justify-center mx-auto'>
                <div className='flex absolute bg-white flex-wrap lg:flex-nowrap'>
                        <div className='relative flex-2

                        flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
                            <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                                <p className='cursor-pointer ' onClick={() => router.back()}>
                                    <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
                                </p>
                            </div>
                            <div className='relative'>
                                <div
                                    className='
                                    {/*lg:h-[100vh] */}
                                    {/*h-[60vh]*/}
                                    '
                                >
                                    {/*<video*/}
                                    {/*    ref={videoRef}*/}
                                    {/*    onClick={onVideoClick}*/}
                                    {/*    loop*/}
                                    {/*    src={post?.video?.asset.url}*/}
                                    {/*    className=' h-full cursor-pointer'*/}
                                    {/*></video>*/}
                                    <img src={post.image?.asset?.url} className='object-cover h-full w-[750px] h-[750px]' alt=''/>
                                </div>
                                {/*<div className='absolute top-[45%] left-[40%]  cursor-pointer'>*/}
                                {/*    {!playing && (*/}
                                {/*        <button onClick={onVideoClick}>*/}
                                {/*            <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />*/}
                                {/*        </button>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                            </div>
                            {/*<div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>*/}
                            {/*    {isVideoMuted ? (*/}
                            {/*        <button onClick={() => setIsVideoMuted(false)}>*/}
                            {/*            <HiVolumeOff className='text-white text-3xl lg:text-4xl' />*/}
                            {/*        </button>*/}
                            {/*    ) : (*/}
                            {/*        <button onClick={() => setIsVideoMuted(true)}>*/}
                            {/*            <HiVolumeUp className='text-white text-3xl lg:text-4xl' />*/}
                            {/*        </button>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </div>

                        <div className='relative w-[500px] md:w-[500px] lg:w-[500px]'>



                            <div className='bg-white border rounded-sm'>
                                {/* Header */}
                                <div className='flex items-center p-2 px-4 gap-2'>
                                    <Link href={`/profile/${post.postedBy._id}`}>
                                        <img src={post.postedBy?.image} className='cursor-pointer rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                                    </Link>

                                        <p className='flex-1 text-sm'>
                                            <Link href={`/profile/${post.postedBy._id}`}>
                                                <span className='font-bold cursor-pointer'>
                                                    {post.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}
                                                </span>
                                            </Link>
                                        </p>


                                    <DotsHorizontalIcon className='h-5'/>
                                </div>


                                    <Comments
                                        postDetails={post}
                                        comment={comment}
                                        setComment={setComment}
                                        addComment={addComment}
                                        comments={post.comments}
                                        isPostingComment={isPostingComment}
                                    />

                                {/*  img  */}
                                {/*<Link href={`/detail/${post._id}`}>*/}
                                {/*    <img src={post.image?.asset?.url} className='object-cover w-full' alt=''/>*/}
                                {/*</Link>*/}
                                {/*  Button  */}
                                {/*<div className='flex justify-between px-4 pt-4'>*/}
                                {/*    <div className='flex space-x-4'>*/}
                                {/*        <HeartIcon className='btn' />*/}
                                {/*        <ChatIcon className='btn' />*/}
                                {/*        <PaperAirplaneIcon className='btn' />*/}
                                {/*    </div>*/}
                                {/*    <BookmarkIcon className='btn' />*/}
                                {/*</div>*/}
                                {/*  caption  */}
                                {/*<p className='p-5 truncate'>*/}
                                {/*    <span className='font-bold mr-1'>{post.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '} </span>*/}
                                {/*    {post.caption}*/}
                                {/*</p>*/}
                                {/*  comments  */}
                                {/*  input box  */}
                                {/*<form className='flex items-center p-4'>*/}
                                {/*    <EmojiHappyIcon className='h-7' />*/}
                                {/*    <input type="text" placeholder='add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>*/}
                                {/*    <button className='font-semibold text-blue-400'>Post</button>*/}
                                {/*</form>*/}
                            </div>






                            {/*<div className='lg:mt-20 mt-10*/}
                            {/*'>*/}
                            {/*    <Link href={`/profile/${post.postedBy._id}`}>*/}
                            {/*        <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>*/}
                            {/*            <Image*/}
                            {/*                width={60}*/}
                            {/*                height={60}*/}
                            {/*                alt='user-profile'*/}
                            {/*                className='rounded-full'*/}
                            {/*                src={post.postedBy.image}*/}
                            {/*            />*/}
                            {/*            <div>*/}
                            {/*                <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>*/}
                            {/*                    {post.postedBy.userName.replace(/\s+/g, '')}{' '}*/}
                            {/*                    <GoVerified className='text-blue-400 text-xl' />*/}
                            {/*                </div>*/}
                            {/*                <p className='text-md'> {post.postedBy.userName}</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </Link>*/}
                            {/*    <div className='px-10'>*/}
                            {/*        <p className=' text-md text-gray-600'>{post.caption}</p>*/}
                            {/*    </div>*/}
                            {/*    <div className='mt-10 px-10'>*/}
                            {/*        {userProfile && <LikeButton*/}
                            {/*            likes={post.likes}*/}
                            {/*            flex='flex'*/}
                            {/*            handleLike={() => handleLike(true)}*/}
                            {/*            handleDislike={() => handleLike(false)}*/}
                            {/*        />}*/}
                            {/*    </div>*/}
                            {/*    <Comments*/}
                            {/*        comment={comment}*/}
                            {/*        setComment={setComment}*/}
                            {/*        addComment={addComment}*/}
                            {/*        comments={post.comments}*/}
                            {/*        isPostingComment={isPostingComment}*/}
                            {/*    />*/}
                            {/*</div>*/}


                        </div>
                    </div>
            </div>
        </div>
    );
};


export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/post/${id}`);

    return {
        props: { postDetails: res.data },
    };
};

export default Detail;