import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import { IUser, igImage } from '../../types';
import { BASE_URL } from '../../utils';

import Header from "../../components/Header";
import Stories from "../../components/Stories";
import {faker} from "@faker-js/faker";
import Story from "../../components/Story";



interface IProps {
    data: {
        user: IUser;
        userVideos: igImage[];
        // userLikedVideos: Video[];
    };
}



const Profile = ({ data }: IProps) => {

    const [suggestions, setSuggestions]: any = useState([]);

    useEffect(()=> {
        const suggestions = [...Array(7)].map((_, i) => ({
            // ...faker.helpers.contextualCard(),
            id: i,
            name: faker.name.firstName(),
            username: faker.internet.userName(),
            avatar: faker.internet.avatar(),
            email: faker.internet.email(),
            dob: faker.date.birthdate(),
            phone: faker.phone.number(),
            address: {
                street: faker.address.streetAddress(false),
                suite: faker.address.secondaryAddress(),
                city: faker.address.city(),
                zipcode: faker.address.zipCode(),
                state: faker.address.state(),
                geo: faker.address.nearbyGPSCoordinate()
            },
            website: faker.internet.domainName(),
            company: {
                name: faker.company.companyName(),
                catchPhrase: faker.company.catchPhraseNoun(),
                bs: faker.company.bs()
            }
        }));

        console.log(suggestions);
        setSuggestions(suggestions);
    },[])


    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <Header/>


            <div className='max-w-4xl mt-16 items-center justify-center mx-auto'>

                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <div className="container flex justify-center items-center">
                        {/*{profileUsername ? (*/}
                            <img
                                className="rounded-full h-40 w-40 flex"
                                // alt={`${fullName} profile picture`}
                                src={`https://i.ibb.co/KFhK5zL/dontrell-professional.jpg`}
                                // onError={(e) => {
                                //     e.target.src = DEFAULT_IMAGE_PATH;
                                // }}
                            />
                         {/*) : (*/}
                         {/*   <Skeleton circle height={150} width={150} count={1} />*/}
                         {/*)}*/}
                    </div>
                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="container flex items-center">
                            <p className="text-2xl mr-4">Test</p>
                            {/*{activeBtnFollow && isFollowingProfile === null ? (*/}
                            {/*    <Skeleton count={1} width={80} height={32} />*/}
                            {/*) : (*/}
                            {/*    activeBtnFollow && (*/}
                                    <button
                                        className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                        type="button"
                                        // onClick={handleToggleFollow}
                                        // onKeyDown={(event) => {
                                        //     if (event.key === 'Enter') {
                                        //         handleToggleFollow();
                                        //     }
                                        // }}
                                    >
                                        {/*{isFollowingProfile ? 'Unfollow' : 'Follow'}*/}
                                        Follow
                                    </button>
                            {/*    )*/}
                            {/*)}*/}
                        </div>
                        <div className="container flex mt-4">
                            {/*{!followers || !following ? (*/}
                            {/*    <Skeleton count={1} width={677} height={24} />*/}
                            {/*) : (*/}
                                <>
                                    <p className="mr-10">
                                        <span className="font-bold"> 12</span> photos
                                    </p>
                                    <p className="mr-10">
                                        <span className="font-bold"> 646</span>
                                        {` `}
                                        {/*{followerCount === 1 ? `follower` : `followers`}*/}
                                        followers
                                    </p>
                                    <p className="mr-10">
                                        <span className="font-bold">23</span> following
                                    </p>
                                </>
                            {/*)}*/}
                        </div>
                        <div className="container mt-4">
                            <p className="font-medium">dontrell dev</p>
                        </div>
                    </div>



                </div>

                <div className='flex justify-between px-10 pt-5 mt-8 rounded-sm'>
                    {suggestions.map((profile: any) => (
                        <div>
                            <img className='h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110
                            transition transform duration-200 ease-out' src={profile.avatar} alt=""/>
                            <p className='text-xs w-14 truncate text-center'>{profile.username}</p>
                        </div>

                    ))}

                </div>

                {/*<Stories/>*/}


                <div className="h-16 border-t border-gray-primary mt-12 mb-12 pt-4">
                    <div className="grid grid-cols-3 pb-8 gap-8 mt-4 mb-12">
                        {/*{!photos*/}
                        {/*    ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)*/}
                        {/*    : photos.length > 0*/}
                        {/*        ? photos.map((photo) => (*/}
                                    <div className="relative group">
                                        <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                                        <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                            <p className="flex items-center text-white font-bold">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-8 mr-2"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {/*{photo.likes.length}*/}
                                                20
                                            </p>

                                            <p className="flex items-center text-white font-bold">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-8 mr-2"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {/*{photo.comments.length}*/}

                                                12
                                            </p>
                                        </div>
                                    </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="cursor-pointer absolute bottom-0 left-0 bg-black/[.2] [#414a4ccc] z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>


                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <img src='https://i.ibb.co/MDFQ77v/Screen-Shot-2022-08-15-at-1-45-34-PM.jpg'  />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.likes.length}*/}
                                    20
                                </p>

                                <p className="flex items-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {/*{photo.comments.length}*/}

                                    12
                                </p>
                            </div>
                        </div>

                                {/*))*/}
                                {/*: null}*/}
                    </div>

                    {/*{!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}*/}
                </div>
            </div>


        </div>
    );
};

export const getServerSideProps = async ({
params: { userId },
}: {
    params: { userId: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

    return {
        props: { data: res.data },
    };
};
export default Profile;
