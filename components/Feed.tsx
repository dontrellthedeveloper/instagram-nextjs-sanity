import React from 'react';
import {NextPage} from 'next';
import Stories from "./Stories";
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

import { igImage } from '../types';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

interface IProps {
    post: igImage
}

const Feed: NextPage<IProps> = ({post}) => {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>
            <section className='col-span-2'>
                {/*  Stories  */}
                <Stories/>
                {/*  Posts  */}
                {/*<Posts/>*/}



                <div className='bg-white my-7 border rounded-sm'>
                    {/* Header */}
                    <div className='flex items-center p-5'>
                        <img src={post.postedBy?.image} className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                        <p className='flex-1 font-bold'>{post.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '}</p>
                        <DotsHorizontalIcon className='h-5'/>
                    </div>
                    {/*  img  */}
                    <img src={post.image.asset.url} className='object-cover w-full' alt=''/>
                    {/*  Button  */}
                    <div className='flex justify-between px-4 pt-4'>
                        <div className='flex space-x-4'>
                            <HeartIcon className='btn' />
                            <ChatIcon className='btn' />
                            <PaperAirplaneIcon className='btn' />
                        </div>
                        <BookmarkIcon className='btn' />
                    </div>
                    {/*  caption  */}
                    <p className='p-5 truncate'>
                        <span className='font-bold mr-1'>{post.postedBy.userName.replace(/\s+/g, '').toLowerCase()}{' '} </span>
                        {post.caption}
                    </p>
                    {/*  comments  */}
                    {/*  input box  */}
                    <form className='flex items-center p-4'>
                        <EmojiHappyIcon className='h-7' />
                        <input type="text" placeholder='add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>
                        <button className='font-semibold text-blue-400'>Post</button>
                    </form>
                </div>

            </section>



            <section className='hidden xl:inline-grid md:col-span-1'>
                <div className='fixed t-20'>
                    <MiniProfile />
                    <Suggestions />
                </div>
            </section>
        </main>
    );
}

export default Feed;