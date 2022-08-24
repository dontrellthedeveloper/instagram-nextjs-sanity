import React, { useState, useEffect } from 'react';
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
    };
}


const Likes: NextPage<IProps> = ({ data }) => {
    const [showUserImages, setShowUserImages] = useState<Boolean>(true);
    const [imagesList, setImagesList] = useState<igImage[]>([]);


    const { user, userImages, userLikedImages } = data;
    const images = showUserImages ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserImages ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        const fetchImages = async () => {
            if (showUserImages) {
                setImagesList(userImages);
            } else {
                setImagesList(userLikedImages);
            }
        };

        fetchImages();
    }, [showUserImages, userLikedImages, userImages]);



    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

            {/* Header */}
            <Header/>
            <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>


                <section className='col-span-2'>
                    {/*<Stories/>*/}
                    {/*{images.length*/}
                    {/*    ? images?.map((image: igImage) => (*/}
                    {/*        <Feed post={image} key={image._id} />*/}
                    {/*    ))*/}
                    {/*    : <NoResults text={`No Videos`} />*/}
                    {/*}*/}


                    <div className='w-full  '>
                        <div className='flex gap-10 mt-16 mb-5 border-b-2 border-gray-200  z-50 w-full'>
                            {/*<p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>*/}
                            {/*    Liked Images*/}
                            {/*</p>*/}
                            {/*<p className={`text-xl font-semibold cursor-pointer ${isImages} mt-2`} onClick={() => setIsAccounts(false)}>*/}
                            {/*    My Images*/}
                            {/*</p>*/}

                            <p className={`text-xl font-semibold cursor-pointer ${images} mt-2`} onClick={() => setShowUserImages(true)}>
                                Images
                            </p>
                            <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserImages(false)}>
                                Liked
                            </p>
                        </div>

                            {/*<div className='md:mt-8'>*/}
                            {/*    {imagesList.length > 0 ? (*/}
                            {/*        imagesList.map((post: igImage, idx: number) => (*/}

                            {/*            <Feed post={post} key={idx} />*/}

                            {/*        ))*/}
                            {/*    ) : (*/}
                            {/*        <NoResults*/}
                            {/*            text={`No ${showUserImages ? '' : 'Liked'} Videos Yet`}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*</div>*/}

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
    params: { likes },
}: {
    params: { likes: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${likes}`);

    return {
        props: { data: res.data },
    };
};
export default Likes;
