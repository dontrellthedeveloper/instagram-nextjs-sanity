import React, {useState} from 'react';
import Image from "next/image";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon
} from "@heroicons/react/outline";
import { googleLogout, GoogleLogin } from '@react-oauth/google';

import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";

import useAuthStore from '../store/authStore';
import {createOrGetUser} from "../utils";

import {HomeIcon} from "@heroicons/react/solid"
import {AiOutlineLogout} from "react-icons/ai";
import Link from "next/link";
import {useRouter} from "next/router";
import {BiSearch} from "react-icons/bi";
// import {AiOutlineLogout} from "react-icons/ai";


const Header = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const { userProfile, addUser, removeUser }: any = useAuthStore();
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();


    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if(searchValue) {
            router.push(`/search/${searchValue}`);
        }
    };

    // @ts-ignore

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto'>
                {/*  Left  */}
                <div className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Link href='/'>
                        <Image
                            src="https://links.papareact.com/ocw"
                            layout='fill'
                            objectFit='contain'
                        />
                    </Link>
                </div>

                <div className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
                    <Link href='/'>
                        <Image
                            src="https://links.papareact.com/jjm"
                            layout='fill'
                            objectFit='contain'
                        />
                    </Link>
                </div>

                {/*  Middle  */}
                <div className='max-w-xs'>

                    <div className='relative mt-1 p-3 rounded-md'>
                        <form
                            onSubmit={handleSearch}
                        >
                            <input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type="text" placeholder="Search" />
                            <button
                                onClick={handleSearch}
                                className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>

                                <SearchIcon className='h-5 w-5 text-gray-500'/>
                            </button>

                        </form>
                    </div>

                </div>

                {/*  Right  */}
                <div className='flex items-center justify-end space-x-4'>


                    {userProfile ? (
                        <>
                            <Link href='/'>
                                <HomeIcon className='navBtn' />
                            </Link>
                            <MenuIcon className='h-6 md:hidden' />
                            <div className='relative navBtn'>
                                <PaperAirplaneIcon className='navBtn rotate-45' />
                                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>3</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                            <UserGroupIcon className='navBtn' />
                            <Link href={`/likes/${userProfile._id}`}>
                            <HeartIcon className='navBtn' />
                            </Link>

                            <img
                                src={userProfile.image}
                                alt='profile pic'
                                className=' h-10 rounded-full cursor-pointer'
                            />
                            <button
                                type='button'
                                className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                                onClick={() => {
                                    googleLogout();
                                    removeUser();
                                }}
                            >
                                <AiOutlineLogout color='red' fontSize={21} />
                                {/*Logout*/}
                            </button>
                        </>
                    ) : (
                        <GoogleLogin
                            onSuccess={(response) => createOrGetUser(response, addUser) }
                            // onSuccess={(response) => console.log(response) }
                            onError={() => console.log('Login Failed')}
                        />
                         // <div></div>
                    )}




                    <div>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header;