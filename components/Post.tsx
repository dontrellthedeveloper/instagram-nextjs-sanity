import React from 'react';
import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon} from "@heroicons/react/outline";

import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'

function Post({id, username, userImg, caption, img}: any) {
    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img src={userImg} className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5'/>
            </div>

            {/*  img  */}
            <img src={img} className='object-cover w-full' alt=''/>

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
                <span className='font-bold mr-1'>{username} </span>
                {caption}
            </p>

            {/*  comments  */}


            {/*  input box  */}


        </div>

    );
}

export default Post;