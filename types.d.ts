export interface igImage {
    caption: string;
    image: {
        asset: {
            _id: string;
            url: string;
        };
    };
    _id: string;
    slug: {
        _type: string;
        current: string;
    }
    postedBy: {
        _id: string;
        userName: string;
        image: string;
        slug: {
            type: string
            current: string
        }
    };
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    comments: {
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        };
    }[];
    userId: string;
}

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
    slug: {
        _type: string;
        current: string;
    }
}


export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    fullName: string;
    description: string;
    link: string;
    image: string;
    followers: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    slug: {
        _type: string;
        current: string;
    }
}