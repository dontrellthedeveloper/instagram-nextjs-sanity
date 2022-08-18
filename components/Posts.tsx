import React from 'react';
import Post from "./Post";
import Image from 'next/image';
import Link from 'next/link';



const posts = [
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        img: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        img: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        img: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        img: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        img: 'https://i.ibb.co/KFhK5zL/dontrell-professional.jpg',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
]


const Posts = (props: any) => {
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

export default Posts;