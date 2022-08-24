import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import {NextPage} from 'next';

import NoResults from '../../components/NoResults';
import { IUser, igImage } from '../../types';
import { BASE_URL } from '../../utils';

import Header from "../../components/Header";
import Stories from "../../components/Stories";

import Story from "../../components/Story";
import Feed from "../../components/Feed";
import Link from "next/link";
import LikeButton from "../../components/LikeButton";
import useAuthStore from "../../store/authStore";
import UserImageCard from "../../components/UserImageCard";
import FollowButton from "../../components/FollowButton";
import {BsGrid3X3, BsPersonSquare} from "react-icons/bs";
import {BiMoviePlay} from "react-icons/bi";



interface IProps {
    data: {
        user: IUser;
        userImages: igImage[];
        userLikedImages: igImage[];
        userFollowedUser: IUser[]
    };
    postDetails: igImage;

    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: any[];
}


interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}





const Profile: NextPage<IProps> = ({ data, isPostingComment, comment, setComment, addComment, comments }) => {
    const [showUserImages, setShowUserImages] = useState<Boolean>(true);
    const [imagesList, setImagesList] = useState<igImage[]>([]);
    const { userProfile, allUsers }: any = useAuthStore();

    const { user, userImages, userLikedImages, userFollowedUser } = data;
    const [userDetails, setUserDetails] = useState(user)
    const images = showUserImages ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserImages ? 'border-b-2 border-black' : 'text-gray-400';





    useEffect(() => {
        const fetchVideos = async () => {
            if (showUserImages) {
                setImagesList(userImages);
            } else {
                setImagesList(userLikedImages);
            }
        };

        fetchVideos();
    }, [showUserImages, userLikedImages, userImages, userFollowedUser]);




    const handleFollow = async (follow: boolean)=> {
        if (userProfile) {
            const {data } = await axios.put(`${BASE_URL}/api/follow`, {
                userId: userProfile._id,
                followId: userDetails._id,
                follow
            })

            setUserDetails({ ...userDetails, followers: data.followers})
        }
    }



    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <Header/>


            <div className='max-w-4xl mt-6 md:mt-16 items-center justify-center mx-auto'>

                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <div className="container flex justify-center items-start md:items-center">
                        {/*{profileUsername ? (*/}
                            <img
                                className="rounded-full h-24 w-24 md:h-36 md:w-36 flex p-[3.5px] border-red-500 border-2"
                                // alt={`${fullName} profile picture`}
                                // src={`https://i.ibb.co/KFhK5zL/dontrell-professional.jpg`}
                                src={userDetails.image}
                                // onError={(e) => {
                                //     e.target.src = DEFAULT_IMAGE_PATH;
                                // }}
                            />
                         {/*) : (*/}
                         {/*   <Skeleton circle height={150} width={150} count={1} />*/}
                         {/*)}*/}
                    </div>
                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="block md:flex container items-center">
                            <p className="text-2xl mr-4">{userDetails.userName.toLowerCase()}</p>

                            {userProfile && (
                                <div className='mt-4'>
                                    <FollowButton
                                        followers={userDetails.followers}
                                    handleFollow={() => handleFollow(true)}
                                    handleUnfollow={() => handleFollow(false)}
                                    />
                                </div>
                            )}

                        </div>
                        <div className="hidden md:flex container flex mt-4">
                            {/*{!followers || !following ? (*/}
                            {/*    <Skeleton count={1} width={677} height={24} />*/}
                            {/*) : (*/}
                                <>
                                    <p className="mr-10">
                                        {userImages?.length == 1 ? (
                                            <>
                                                <span className="font-bold"> {userImages?.length || 0}</span> post
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-bold"> {userImages?.length || 0}</span> posts
                                            </>
                                        )}


                                    </p>
                                    <p className="mr-10">
                                        {userDetails.followers?.length == 1 ? (
                                            <>

                                                <span className="font-bold"> {userDetails.followers?.length || 0}
                                                </span> follower

                                            </>
                                        ) : (
                                            <>

                                                <span className="font-bold"> {userDetails.followers?.length || 0}</span> followers

                                            </>
                                        )}
                                        {/*<span className="font-bold">{userDetails.followers?.length || 0} </span>{` `}followers*/}
                                    </p>
                                    <p className="mr-10">
                                        <span className="font-bold">{userFollowedUser?.length || 0}</span> following
                                    </p>
                                </>
                            {/*)}*/}
                        </div>

                            <div className="hidden md:block container mt-4">
                                <p className="font-bold">{userDetails.fullName}</p>
                            </div>
                            <div className="hidden md:block container mt-4">
                                <p className="text-sm">{userDetails.description}</p>
                            </div>
                            <div className="hidden md:block container mt-4">
                                <p className="cursor-pointer text-blue-900 font-medium">{userDetails.link}</p>
                            </div>

                    </div>



                </div>


                <div className="block md:hidden pl-4 container mt-6">
                    <p className="font-bold">{userDetails.fullName}</p>
                </div>
                <div className="block md:hidden pl-4 container mt-2">
                    <p className="text-sm">{userDetails.description}</p>
                </div>
                <div className="block md:hidden pl-4 container mt-1">
                    <p className="cursor-pointer text-blue-900 font-medium">{userDetails.link}</p>
                </div>



                {/*<div className='flex space-x-8 p-6 mt-8 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200'>*/}
                {/*    {suggestions.map((profile: any) => (*/}
                {/*        <Story key={profile.id} img={profile.avatar} username={profile.username}*/}
                {/*        />*/}
                {/*    ))}*/}

                {/*</div>*/}



                {/*<div className='flex px-10 pt-5 mt-8 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 space-x-10'>*/}
                {/*    {suggestions.map((profile: any) => (*/}
                {/*        <div>*/}
                {/*            <img className='h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110*/}
                {/*            transition transform duration-200 ease-out' src={profile.avatar} alt=""/>*/}
                {/*            <p className='text-xs w-14 truncate text-center'>{profile.username}</p>*/}
                {/*        </div>*/}

                {/*    ))}*/}

                {/*</div>*/}


                <div className='flex space-x-4 md:space-x-14 p-6 mt-2 md:mt-8 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200'>
                    {/*{suggestions.map((profile: any) => (*/}
                    {/*    // <Story key={profile.id} img={profile.avatar} username={profile.username}*/}
                    {/*    // />*/}

                    {/*    <div key={profile.id}>*/}
                    {/*    <img className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110*/}
                    {/*        transition transform duration-200 ease-out' src={profile.avatar} alt=""/>*/}
                    {/*    <p className='text-xs w-14 truncate text-center'>{profile.username}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}




                    {imagesList.length > 0 ? (
                        imagesList.map((post: igImage, idx: number) => (
                            <div key={idx}>
                                <img className='h-14 w-14 md:h-20 md:w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110
                            transition transform duration-200 ease-out' src={post?.image?.asset.url} alt=""/>
                                <p className='text-xs w-14 truncate text-center mx-auto'>{post.caption.toLowerCase()}</p>
                            </div>

                        ))
                    ) : (
                        // <NoResults
                        //     text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                        // />
                        <div>

                        </div>
                    )}


                </div>

                {/*<Stories/>*/}

                <div className="block md:hidden h-16 border-t border-gray-primary md:mt-4 md:mb-12 md:pt-4">
                    <div className="h-16 items-center grid grid-cols-3 md:pb-8 md:gap-8 md:mt-4 md:mb-12">
                        <p className="text-center">
                            {userImages?.length == 1 ? (
                                <>
                                    <span className="font-bold block"> {userImages?.length || 0}</span> <span className='text-xs text-gray-500'>post</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-bold block"> {userImages?.length || 0}</span> <span className='text-sm text-gray-500'>posts</span>
                                </>
                            )}


                        </p>
                        <p className="text-center">
                            {userDetails.followers?.length == 1 ? (
                                <>
                                    <span className="font-bold block"> {userDetails.followers?.length || 0}
                                    </span> <span className='text-xs text-gray-500'>follower</span>

                                </>
                            ) : (
                                <>

                                    <span className="font-bold block"> {userDetails.followers?.length || 0}</span> <span className='text-xs text-gray-500'>followers</span>

                                </>
                            )}
                            {/*<span className="font-bold">{userDetails.followers?.length || 0} </span>{` `}followers*/}
                        </p>
                        <p className="text-center">
                            <span className="font-bold block">{userFollowedUser?.length || 0}</span> <span className='text-xs text-gray-500'>following</span>
                        </p>
                    </div>
                </div>


                <div className="block md:hidden h-8 border-t border-gray-primary md:mt-4 md:mb-12 md:pt-4">
                    <div className="h-8 items-center grid grid-cols-3 md:pb-8 md:gap-8 md:mt-4 md:mb-12">

                        <div className='text-blue-600git a text-center mx-auto'>
                            <BsGrid3X3 className=''/>
                        </div>

                        <div className=' text-center mx-auto'>
                            <BiMoviePlay/>
                        </div>

                        <div className=' text-center mx-auto'>
                            <BsPersonSquare/>
                        </div>

                    </div>
                </div>


                <div className="hidden md:flex mx-auto h-5 border-t border-gray-primary md:mt-2 md:mb-6 md:pt-3">
                    <div className="h-5 flex items-center mx-auto md:pb-8 md:gap-8 md:mt-2">

                        <div className='flex font-bold border-t border-black p-3 text-black text-center mx-auto'>
                            <BsGrid3X3 className='font-bold items-center'/>
                            <p className='uppercase text-xs items-center ml-1.5'>Posts</p>
                        </div>

                        <div className='flex text-center mx-auto text-gray-400'>
                            <BiMoviePlay className='font-bold items-center '/>
                            <p className='uppercase text-xs items-center ml-1.5'>Reels</p>
                        </div>

                        <div className='flex text-center mx-auto text-gray-400'>
                            <BsPersonSquare className='font-bold items-center '/>
                            <p className='uppercase text-xs items-center ml-1.5'>Tagged</p>
                        </div>

                    </div>
                </div>


                <div className="h-16   lg:mb-12 ">
                    <div className="grid grid-cols-3 lg:pb-8 md:gap-6 lg:gap-8  lg:mb-12">
                        {/*{!photos*/}
                        {/*    ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)*/}
                        {/*    : photos.length > 0*/}
                        {/*        ? photos.map((photo) => (*/}



                        {imagesList.length > 0 ? (
                            imagesList.map((post: igImage, idx: number) => (

                                    <UserImageCard
                                        isPostingComment={isPostingComment}
                                        comment={comment}
                                        setComment={setComment}
                                        addComment={addComment}
                                        comments={comments}
                                        post={post}
                                        idx={idx}
                                    />



                            ))
                        ) : (
                            // <NoResults
                            //     text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                            // />
                            <div>

                            </div>
                        )}


                        {/*<div className="relative group">*/}
                        {/*    <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />*/}

                        {/*    <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">*/}
                        {/*        <p className="flex items-center text-white font-bold">*/}
                        {/*            <svg*/}
                        {/*                xmlns="http://www.w3.org/2000/svg"*/}
                        {/*                viewBox="0 0 20 20"*/}
                        {/*                fill="currentColor"*/}
                        {/*                className="w-8 mr-4"*/}
                        {/*            >*/}
                        {/*                <path*/}
                        {/*                    fillRule="evenodd"*/}
                        {/*                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"*/}
                        {/*                    clipRule="evenodd"*/}
                        {/*                />*/}
                        {/*            </svg>*/}
                        {/*            /!*{photo.likes.length}*!/*/}
                        {/*            20*/}
                        {/*        </p>*/}

                        {/*        <p className="flex items-center text-white font-bold">*/}
                        {/*            <svg*/}
                        {/*                xmlns="http://www.w3.org/2000/svg"*/}
                        {/*                viewBox="0 0 20 20"*/}
                        {/*                fill="currentColor"*/}
                        {/*                className="w-8 mr-4"*/}
                        {/*            >*/}
                        {/*                <path*/}
                        {/*                    fillRule="evenodd"*/}
                        {/*                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"*/}
                        {/*                    clipRule="evenodd"*/}
                        {/*                />*/}
                        {/*            </svg>*/}
                        {/*            /!*{photo.comments.length}*!/*/}

                        {/*            12*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                                {/*))*/}
                                {/*: null}*/}
                    </div>

                    {/*{!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}*/}
                </div>
            </div>


        </div>
    );
};

export const getServerSideProps = async ({
params: { userId },
}: {
    params: { userId: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

    return {
        props: { data: res.data },
    };
};
export default Profile;
