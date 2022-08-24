import React, { useState } from 'react';
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

const Search = ({ images }: { images: igImage[] }) => {
    const [isAccounts, setIsAccounts] = useState(true);
    const { allUsers }: { allUsers: IUser[] } = useAuthStore();

    const router = useRouter();
    const { searchTerm }: any = router.query;

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isImages = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));



    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

                {/* Header */}
                <Header/>
            <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>


                <section className='col-span-2'>


                    <div className='w-full  '>
                        <div className='flex gap-10 mt-16 mb-5 border-b-2 border-gray-200  z-50 w-full'>
                            <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
                                Accounts
                            </p>
                            <p className={`text-xl font-semibold cursor-pointer ${isImages} mt-2`} onClick={() => setIsAccounts(false)}>
                                Images
                            </p>
                        </div>
                        {isAccounts ? (
                            <div className='md:mt-8'>
                                {searchedAccounts.length > 0 ? (
                                    searchedAccounts.map((user: IUser, idx: number) => (
                                        <Link key={idx} href={`/profile/${user._id}`}>
                                            <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                                <div>
                                                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                                                            {user.userName.toLowerCase()}
                                                            <GoVerified className='text-blue-400' />
                                                        </p>
                                                        <p className='capitalize text-gray-400 text-sm'>
                                                            {user.fullName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <NoResults text={`No Account Results for ${searchTerm}`} />
                                )}
                            </div>
                        ) : (
                            <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
                                {/*{images.length*/}
                                {/*    ? images?.map((image: igImage) => (*/}
                                {/*        <Feed post={image} key={image._id} />*/}
                                {/*    ))*/}
                                {/*    : <NoResults text={`No Images`} />*/}
                                {/*}*/}
                            </div>
                        )}
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
     params: { searchTerm },
 }: {
    params: { searchTerm: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { images: res.data },
    };
};

export default Search;