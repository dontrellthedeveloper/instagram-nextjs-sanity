import React from 'react';
import Stories from "./Stories";
import Posts from "./Posts";

function Feed() {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>
            <section className='col-span-2'>
                {/*  Stories  */}
                <Stories/>
                {/*  Posts  */}
                <Posts/>
            </section>

            <section>
                {/*  Mini Profile  */}
                {/*  Suggestions  */}
            </section>
        </main>
    );
}

export default Feed;