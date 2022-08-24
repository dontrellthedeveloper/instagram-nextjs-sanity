import React, {Dispatch, SetStateAction, useState} from 'react';
import Link from "next/link";
import {igImage} from "../types";
import {NextPage} from 'next';

import LikeButton from "./LikeButton";
import axios from "axios";
import {BASE_URL} from "../utils";
import useAuthStore from "../store/authStore";

interface IProps {
    post: igImage
    idx: number
}


interface IProps {
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


const UserImageCard: NextPage<IProps> = ({post, idx, comments}) => {
    const { userProfile }: any = useAuthStore();

    const [postCard, setPostCard] = useState(post);

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPostCard({ ...post, likes: data.likes });
        }
    };

    return (

            <div key={idx} className="relative group">
                <img src={postCard?.image?.asset.url} />
                <Link href={`/detail/${postCard._id}`}>

                    <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                        <p className="flex items-center text-white font-bold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-6 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {postCard.likes?.length || 0}
                        </p>

                        <p className="flex items-center text-white font-bold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-6 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {postCard.comments?.length || 0}


                        </p>
                    </div>
                </Link>



            </div>

    );
};

export default UserImageCard;
