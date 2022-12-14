export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      slug,
      userId,
      postedBy->{
        _id,
        userName,
        image,
        verified
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image,
      verified
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image,
      verified
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image,
      verified
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image,
      verified
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const singleUserSlugQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && slug.current == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"] | order(order asc)`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image,
      verified
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image,
      verified
    },
    }
  }`;

  return query;
};






export const userFollowersQuery = (followers: string | string[]) => {
  const query = `*[ _type == 'user' && userId == '${followers}'] | order(_createdAt desc){
    _id,
    userName,
   caption,
   verified,
     image{
      asset->{
        _id,
        url
      }
    },
   followers,
  }`;
  return query;
}




export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image,
      verified
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image,
      verified
    },
    }
  }`;

  return query;
};





export const userFollowedUserQuery = (userId: string | string[]) => {
  const query = `*[_type == 'user' && '${userId}' in followers[]._ref ] | order(_createdAt desc) {
    _id,
    userName,
    verified,
   caption,
     image{
      asset->{
        _id,
        url
      }
    },
   followers,
  }`;

  return query;
};






export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image,
      verified
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image,
      verified
    },
    }
  }`;

  return query;
};
