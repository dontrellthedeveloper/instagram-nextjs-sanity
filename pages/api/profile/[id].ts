import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, singleUserSlugQuery, userLikedPostsQuery, userFollowedUserQuery, userFollowersQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        // const { slug } = req.query;
        // console.log(req.query)


        const query = singleUserQuery(id);

        const userImagesQuery = userCreatedPostsQuery(id);
        const userLikedImagesQuery = userLikedPostsQuery(id);

        const userFollowQuery = userFollowersQuery(id);
        const userFollowedQuery = userFollowedUserQuery(id);

        const user = await client.fetch(query);
        const userImages = await client.fetch(userImagesQuery);
        const userFollowers = await client.fetch(userFollowQuery);
        const userLikedImages = await client.fetch(userLikedImagesQuery);
        const userFollowedUser = await client.fetch(userFollowedQuery);

        const data = { user: user[0], userImages, userFollowers,
            userLikedImages, userFollowedUser
        };


        res.status(200).json(data);
    }
}