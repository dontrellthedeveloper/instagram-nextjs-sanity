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
            name: 'slug',
            title: 'Handle',
            type: 'slug',
            options: {
                source: 'userName',
                maxLength: 96,
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string',
        },
        {
            name: "order",
            title: "Order",
            type: "number",
            hidden: true,
        },
    ],
};