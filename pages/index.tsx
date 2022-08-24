import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import NoResults from '../components/NoResults';

import axios from 'axios';
import { igImage } from '../types';
import Modal from "../components/Modal";
import Stories from "../components/Stories";
import React, {Dispatch, SetStateAction} from "react";
import MiniProfile from "../components/MiniProfile";
import Suggestions from "../components/Suggestions";
import SuggestedAccounts from "../components/SuggestedAccounts";
import {BASE_URL} from "../utils";

interface IProps {
    images: igImage[];
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

const Home: NextPage<IProps> = ({images, isPostingComment, comment, setComment, addComment, comments}) => {
    console.log(images)
    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

            {/* Header */}
            <Header/>

            {/* Feed */}

            {/*<div className='flex flex-col gap-10 videos h-full'>*/}
            <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>


                <section className='col-span-2'>
                    <Stories/>
                    {images.length
                        ? images?.map((image: igImage) => (
                            <Feed
                                isPostingComment={isPostingComment}
                                comment={comment}
                                setComment={setComment}
                                addComment={addComment}
                                comments={comments}
                                post={image}
                                key={image._id}
                            />
                        ))
                        : <NoResults text={`No Videos`} />
                    }
                </section>


                <section className='hidden xl:inline-grid md:col-span-1'>
                    <div className='fixed t-20'>
                        <MiniProfile />
                        <SuggestedAccounts/>
                    </div>
                </section>
            </main>


            {/*<Feed/>*/}

            {/* Modal */}
            <Modal/>
        </div>
    )
}

export default Home;

export const getServerSideProps = async () => {
    const {data} = await axios.get(`${BASE_URL}/api/post`);


    return {
        props: {
            images: data
        }
    }
};
