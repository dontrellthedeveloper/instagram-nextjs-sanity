import React, {Fragment, useRef, useState, useEffect} from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";
import {Dialog, Transition} from "@headlessui/react";
import {CameraIcon} from "@heroicons/react/solid";


import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import {MdDelete} from "react-icons/md";
import {FaCloudUploadAlt} from "react-icons/fa";



function Modal() {
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [imageAsset, setImageAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
    const [savingPost, setSavingPost] = useState<Boolean>(false);




    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef: any = useRef(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile]: any = useState(null)





    const userProfile: any = useAuthStore((state) => state.userProfile);
    const router = useRouter();

    const uploadImage = async (e: any) => {

        const selectedFile = e.target.files[0];
        const fileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

        if (fileTypes.includes(selectedFile.type)) {
            client.assets
                .upload('file', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setImageAsset(data);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }




    const handlePost = async () => {
        if (caption && imageAsset?._id ) {
            setSavingPost(true);

            const doc = {
                _type: 'post',
                caption,
                image: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id,
                    },
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                }
            };

            await axios.post(`http://localhost:3000/api/post`, doc);

            setOpen(false)
            // await router.push('/');
        }
    }







    const uploadPost = async () => {
        if(loading) return;
        setLoading(true)
    }

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={setOpen}
            >
                <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-100'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    {/*  Trick Browser into centering modal content  */}
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden={true}>&#8203</span>

                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >

                            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>

                                {isLoading ? (
                                    <p>Uploading...</p>
                                ): (
                                    <div>
                                        {imageAsset ? (
                                            <div>
                                                <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                                                    <img
                                                        className='rounded-xl mt-16 bg-black'
                                                        src={imageAsset?.url}
                                                    />
                                                    <div className=' flex justify-between gap-20'>
                                                        <p className='text-lg'>{imageAsset.originalFilename}</p>
                                                        <button
                                                            type='button'
                                                            className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                                            onClick={() => setImageAsset(undefined)}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className='cursor-pointer'>
                                                <div className='flex flex-col items-center justify-center h-full'>
                                                    <div className='flex flex-col justify-center items-center'>
                                                        <p className='font-bold text-xl'>
                                                            <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                            {/*<CameraIcon*/}
                                                            {/*                    className='h-6 w-6 text-red-600'*/}
                                                            {/*                  aria-hidden='true'*/}
                                                            {/*                />*/}
                                                        </p>
                                                        <p className='text-xl font-semibold'>
                                                            Upload Image
                                                        </p>
                                                    </div>
                                                    {/*<p className='text-gray-400 text-center mt-10 text-sm leading-10'>*/}
                                                    {/*    MP4 or WebM or ogg <br />*/}
                                                    {/*    720x1280 resolution or higher <br />*/}
                                                    {/*    Up to 3 minutes <br />*/}
                                                    {/*    Less than 200MB*/}
                                                    {/*    /!*Up to 10 minutes <br />*!/*/}
                                                    {/*    /!*Less than 2GB*!/*/}
                                                    {/*</p>*/}
                                                    <p className='bg-[#ef0a4f] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                        Select file
                                                    </p>
                                                </div>
                                                <input
                                                    type='file'
                                                    name='upload-video'
                                                    onChange={uploadImage}
                                                    className='w-0 h-0'
                                                />
                                            </label>
                                        )}
                                    </div>
                                )}
                                {wrongFileType && (
                                    <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
                                        Please select an video file (mp4 or webm or ogg)
                                    </p>
                                )}
                                {/*<div>*/}

                                {/*    {imageAsset ? (*/}
                                {/*        <>*/}
                                {/*            <img*/}
                                {/*                src={imageAsset?.url}*/}
                                {/*                className='w-full object-contain cursor-pointer'*/}
                                {/*                onClick={() => setImageAsset(undefined)}*/}
                                {/*            />*/}
                                {/*            <div className=' flex justify-between gap-20'>*/}
                                {/*                <p className='text-lg'>{imageAsset.originalFilename}</p>*/}
                                {/*                <button*/}
                                {/*                    type='button'*/}
                                {/*                    className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'*/}
                                {/*                    onClick={() => setImageAsset(undefined)}*/}
                                {/*                >*/}
                                {/*                    <MdDelete />*/}
                                {/*                </button>*/}
                                {/*            </div>*/}
                                {/*        </>*/}

                                {/*    ):(*/}
                                {/*        <>*/}
                                {/*            <div*/}
                                {/*                onClick={uploadImage}*/}
                                {/*                className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'*/}
                                {/*            >*/}
                                {/*                <CameraIcon*/}
                                {/*                    className='h-6 w-6 text-red-600'*/}
                                {/*                    aria-hidden='true'*/}
                                {/*                />*/}
                                {/*            </div>*/}
                                {/*        </>*/}
                                {/*    )}*/}

                                {/*    <div>*/}
                                {/*        <div className='mt-3 text-center sm:mt-5'>*/}
                                {/*            <Dialog.Title*/}
                                {/*                as='h3'*/}
                                {/*                className='text-lg leading-6 font-medium text-gray-900'*/}
                                {/*            >*/}
                                {/*                Upload a Photo*/}
                                {/*            </Dialog.Title>*/}
                                {/*            <div>*/}
                                {/*                <input*/}
                                {/*                    ref={filePickerRef}*/}
                                {/*                    type='file'*/}
                                {/*                    hidden*/}
                                {/*                    onChange={addImageToPost}*/}
                                {/*                />*/}
                                {/*            </div>*/}

                                {/*            <div className='mt-2'>*/}
                                {/*                <input*/}
                                {/*                    className='border-none focus:ring-0 w-full text-center'*/}
                                {/*                    type='text'*/}
                                {/*                    ref={captionRef}*/}
                                {/*                    placeholder="Please enter a caption..."*/}
                                {/*                />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}

                                {/*    </div>*/}

                                {/*    <div className='mt-5 sm:mt-5'>*/}
                                {/*        <button*/}
                                {/*            type="button"*/}
                                {/*            // disabled={!selectedFile}*/}
                                {/*            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled::bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"*/}
                                {/*            onClick={handlePost}*/}
                                {/*        >*/}
                                {/*            Upload Post*/}
                                {/*        </button>*/}

                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className='flex flex-col gap-3 pb-10'>
                                    <label className='text-md font-medium '>Caption</label>
                                    <input
                                        type='text'
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                                    />
                                    {/*<label className='text-md font-medium '>Choose a topic</label>*/}
                                    {/*<select*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        setCategory(e.target.value);*/}
                                    {/*    }}*/}
                                    {/*    className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'*/}
                                    {/*>*/}
                                    {/*    {topics.map((item) => (*/}
                                    {/*        <option*/}
                                    {/*            key={item.name}*/}
                                    {/*            className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'*/}
                                    {/*            value={item.name}*/}
                                    {/*        >*/}
                                    {/*            {item.name}*/}
                                    {/*        </option>*/}
                                    {/*    ))}*/}
                                    {/*</select>*/}
                                    <div className='flex gap-6 mt-10'>
                                        <button
                                            onClick={() => {}}
                                            type='button'
                                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                        >
                                            Discard
                                        </button>
                                        <button
                                            onClick={handlePost}
                                            type='button'
                                            className='bg-[#ef0a4f] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                        >
                                            {/*{savingPost ? 'Posting...' : 'Post'}*/}
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>















                    </Transition.Child>
                </div>
            </Dialog>

        </Transition.Root>
    );
}

export default Modal;