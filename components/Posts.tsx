import React from 'react';
import Post from "./Post";

const posts = [
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
    {
        id: '123',
        username: 'dontrellthedev',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'SUBSCRIBE AND DESTROY THE LIKE BUTTON for the YT algorithm'
    },
]


function Posts(props: any) {
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
            <Post/>
        </div>
    );
}

export default Posts;