import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";

import axios from 'axios';
import { Image } from '../types';

interface IProps {
    images: Image[];
}

const Home = ({images}: IProps) => {
    console.log(images)
    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
            <Head>
                <title>Instagram | Dontrell Dev</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <Header/>

            {/* Feed */}
            <Feed/>

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
