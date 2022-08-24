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
                <div className='flex absolute flex-wrap lg:flex-nowrap'>
                        <div className='relative flex-2 md:mx-auto

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
                                    <img src={post.image?.asset?.url} className='object-cover h-full w-[750px] h-[750px]' alt=''/>
                                </div>
                            </div>
                        </div>

                        <div className='relative md:mx-auto w-[100%] md:w-[750px] lg:w-[500px]'>



                            <div className=' border rounded-sm'>
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

                            </div>

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