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


            <div className='max-w-4xl mt-16 items-center justify-center mx-auto'>

                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <div className="container flex justify-center items-center">
                        {/*{profileUsername ? (*/}
                            <img
                                className="rounded-full h-36 w-36 flex p-[3.5px] border-red-500 border-2"
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
                        <div className="container flex items-center">
                            <p className="text-2xl mr-4">{userDetails.userName.toLowerCase()}</p>

                            {userProfile && (
                                <FollowButton
                                    followers={userDetails.followers}
                                handleFollow={() => handleFollow(true)}
                                handleUnfollow={() => handleFollow(false)}
                                />
                            )}

                        </div>
                        <div className="container flex mt-4">
                            {/*{!followers || !following ? (*/}
                            {/*    <Skeleton count={1} width={677} height={24} />*/}
                            {/*) : (*/}
                                <>
                                    <p className="mr-10">
                                        {userImages?.length == 1 ? (
                                            <>
                                                <span className="font-bold"> {userImages?.length || 0}</span> photo
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-bold"> {userImages?.length || 0}</span> photos
                                            </>
                                        )}


                                    </p>
                                    <p className="mr-10">
                                        {userDetails.followers?.length == 1 ? (
                                            <>
                                                <span className="font-bold"> {userDetails.followers?.length || 0}</span> follower
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-bold"> {userDetails.followers?.length || 0}</span> followers
                                            </>
                                        )}
                                        {/*<span className="font-bold">{userDetails.followers?.length || 0} </span>{` `}followers*/}
                                    </p>
                                    <p className="mr-10">
                                        <span className="font-bold">
                                            {userFollowedUser?.length || 0}

                                        </span> following
                                    </p>
                                </>
                            {/*)}*/}
                        </div>
                        <div className="container mt-4">
                            <p className="font-bold">{userDetails.fullName}</p>
                        </div>
                        <div className="container mt-4">
                            <p className="text-sm">{userDetails.description}</p>
                        </div>
                        <div className="container mt-4">
                            <p className="text-blue-900 font-medium">{userDetails.link}</p>
                        </div>
                    </div>



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


                <div className='flex space-x-8 p-6 mt-8 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200'>
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
                                <img className='h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110
                            transition transform duration-200 ease-out mr-5' src={post?.image?.asset.url} alt=""/>
                                <p className='text-xs w-14 truncate text-center'>{userDetails.userName}</p>
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


                <div className="h-16 border-t border-gray-primary mt-4 mb-12 pt-4">
                    <div className="grid grid-cols-3 pb-8 gap-8 mt-4 mb-12">
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
