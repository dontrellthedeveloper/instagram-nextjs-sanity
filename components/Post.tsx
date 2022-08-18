

import React from 'react';
import {DotsHorizontalIcon} from "@heroicons/react/outline";

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


            {/*  caption  */}


            {/*  comments  */}


            {/*  input box  */}


        </div>

    );
}

export default Post;