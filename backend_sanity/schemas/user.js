export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'UserName',
            type: 'string',
        },
        {
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string',
        },
        {
            name: 'followers',
            title: 'Followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
        },
        {
            name: "order",
            title: "Order",
            type: "number",
            hidden: true,
        },
    ],
};