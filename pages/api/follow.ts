import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { userId, followId, follow } = req.body;

        const data =
            follow ? await client
                    .patch(followId)
                    .setIfMissing({ followers: [] })
                    .insert('after', 'followers[-1]', [
                        {
                            _key: uuid(),
                            _ref: userId,
                        },
                    ])
                    .commit()
                : await client
                    .patch(followId)
                    .unset([`followers[_ref=="${userId}"]`])
                    .commit();

        res.status(200).json(data);
    }
}