import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import {igImage, IUser} from '../../types';
import Feed from "../../components/Feed";
import Stories from "../../components/Stories";
import MiniProfile from "../../components/MiniProfile";
import SuggestedAccounts from "../../components/SuggestedAccounts";
import Header from "../../components/Header";
import {NextPage} from "next";



interface IProps {
    data: {
        user: IUser;
        userImages: igImage[];
        userLikedImages: igImage[];
        userFollowers: IUser[];
        userFollowedUser: IUser[];
    };
}



const Followers: NextPage<IProps>  = ({ data }) => {
    const [isAccounts, setIsAccounts] = useState(true);
    const { userProfile, allUsers }: any = useAuthStore();

    const [showUserFollowers, setShowUserFollowers] = useState<Boolean>(true);
    const [followerList, setFollowerList] = useState<IUser[]>([]);

    const { user, userImages, userLikedImages, userFollowedUser, userFollowers } = data;
    const [userDetails, setUserDetails] = useState(user)


    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isImages = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';


    useEffect(() => {
        const fetchImages = async () => {
            if (showUserFollowers) {
                setFollowerList(userFollowers);
            } else {
                setFollowerList(userFollowedUser);
            }
        };

        fetchImages();
    }, [showUserFollowers, userLikedImages, userImages, userFollowers, userFollowedUser]);




    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

            {/* Header */}
            <Header/>
            <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>


                <section className='col-span-2'>



                    <div className='w-full  '>
                        <div className='flex gap-10 mt-16 mb-5 border-b-2 border-gray-200  z-50 w-full'>
                            <p onClick={() => setShowUserFollowers(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
                                Followers
                            </p>
                            <p className={`text-xl font-semibold cursor-pointer ${isImages} mt-2`} onClick={() => setShowUserFollowers(false)}>
                                Images
                            </p>
                        </div>

                            <div className='md:mt-8'>
                                {followerList.length > 0 ? (
                                    followerList.map((user: IUser, idx: number) => (
                                        <Link key={idx} href={`/profile/${user._id}`}>
                                            <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                                <div>
                                                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                                                            {user.userName} <GoVerified className='text-blue-400' />
                                                        </p>
                                                        <p className='capitalize text-gray-400 text-sm'>
                                                            {user.userName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <NoResults
                                        text={`No ${showUserFollowers ? '' : 'Liked'} Videos Yet`}
                                    />
                                )}
                            </div>
                    </div>
                </section>


                <section className='hidden xl:inline-grid md:col-span-1'>
                    <div className='fixed t-20'>
                        <MiniProfile />
                        <SuggestedAccounts/>
                    </div>
                </section>
            </main>

        </div>
    );
};

export const getServerSideProps = async ({
     params: { followers },
 }: {
    params: { followers: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${followers}`);

    return {
        props: { data: res.data },
    };
};

export default Followers;