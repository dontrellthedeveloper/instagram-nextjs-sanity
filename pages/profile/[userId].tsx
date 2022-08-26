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
                                src={userDetails.image}
                            />

                    </div>
                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="block md:flex container items-center">
                            <div className='flex'>
                            <p className="text-2xl mr-1.5">
                                {userDetails.userName.toLowerCase()}
                            </p>
                                {userDetails.verified && (
                                    <GoVerified className='w-3.5 h-3.5 my-auto ml-1 mr-1 text-[#3494f4]' />
                                )}

                            </div>

                            {userProfile && (
                                <div className='mt-4 ml-6'>
                                    <FollowButton
                                        followers={userDetails.followers}
                                    handleFollow={() => handleFollow(true)}
                                    handleUnfollow={() => handleFollow(false)}
                                    />
                                </div>
                            )}

                        </div>
                        <div className="hidden md:flex container flex mt-4">
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

                                    </p>
                                    <p className="mr-10">
                                        <span className="font-bold">{userFollowedUser?.length || 0}</span> following
                                    </p>
                                </>
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




                <div className='flex space-x-4 md:space-x-14 p-6 mt-2 md:mt-8 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200'>




                    {imagesList.length > 0 ? (
                        imagesList.map((post: igImage, idx: number) => (
                            <div key={idx}>
                                <Link href={`/detail/${post._id}`}>
                                    <img className='h-14 w-14 md:h-20 md:w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110
                                transition transform duration-200 ease-out' src={post?.image?.asset.url} alt=""/>
                                </Link>
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

                        <div className='text-blue-600 border-t border-blue-600 p-2 text-center mx-auto'>
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


                    </div>


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
