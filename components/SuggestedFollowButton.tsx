import React, {useState, useEffect} from 'react';
import {RiUserFollowFill} from "react-icons/ri";
import {NextPage} from "next";

import useAuthStore from "../store/authStore";

interface IProps {
    handleFollow: () => void;
    handleUnfollow: () => void;
    followers: any[];
}


const FollowButton: NextPage<IProps> = ({followers, handleFollow, handleUnfollow}) => {
    const [alreadyFollowed, setAlreadyFollowed] = useState(false);
    const {userProfile}: any = useAuthStore();

    const filterFollowers = followers?.filter((item) => item._ref === userProfile?._id)

    useEffect(() => {
        if(filterFollowers?.length > 0) {
            setAlreadyFollowed(true)
        } else {
            setAlreadyFollowed(false)
        }
    }, [filterFollowers,followers]);


    return (
        <div>
            {alreadyFollowed ? (
                <button
                    className=" border-2 font-bold text-lg rounded text-black w-20 h-8"
                    type="button"
                    onClick={handleUnfollow}
                >
                    <RiUserFollowFill className='mx-auto'/>

                </button>
            ): (
                <button
                    onClick={handleFollow}
                    className="bg-[#0894f4] font-bold text-sm rounded text-white w-20 h-8"
                    type="button"

                >
                    Follow

                </button>
            )}

        </div>
    );
};

export default FollowButton;
