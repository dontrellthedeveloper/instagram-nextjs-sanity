import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import NoResults from '../components/NoResults';

import axios from 'axios';
import { igImage } from '../types';

interface IProps {
    images: igImage[];
}

const Home = ({images}: IProps) => {
    console.log(images)
    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

            {/* Header */}
            <Header/>

            {/* Feed */}

            {/*<div className='flex flex-col gap-10 videos h-full'>*/}
            <div>
                {images.length
                    ? images?.map((image: igImage) => (
                        <Feed post={image} key={image._id} />
                    ))
                    : <NoResults text={`No Videos`} />}
            </div>

            {/*<Feed/>*/}

            {/* Modal */}
        </div>
    )
}

export default Home;

export const getServerSideProps = async () => {
    const {data} = await axios.get(`http://localhost:3000/api/post`);


    return {
        props: {
            images: data
        }
    }
};
