export const allPostsQuery = (offset: number, limit: number) => {
  return `
  { "videos": *[_type == "post"] | order(_createdAt desc) [${offset}...${limit}]{
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          image
        },
      likes,
      comments[] {
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          givenName,
          familyName,
          image
        },
      },
    },
    "total": count(*[_type == "post"])
  }`;
};

export const postDetailQuery = (postId: string | string[]) => {
  return `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        givenName,
        familyName,
        image
      },
    }
  }`;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  return `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
    }
  }`;
};

export const searchUsersQuery = (searchTerm: string | string[]) => {
  return `*[_type == "user" && userName match '${searchTerm}*'] {
    _id,
    userName,
    givenName,
    familyName,
    image
  }`;
};

export const singleUserQuery = (userId: string | string[]) => {
  return `*[_type == "user" && _id == '${userId}']`;
};

export const userSuggestedQuery = (userId: string | string[]) => {
  return `*[_type == "user" && _id != '${userId}'] [0...6]{
    _id,
    userName,
    givenName,
    familyName,
    image
  }`;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  return `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
    }
  }`;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  return `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      givenName,
      familyName,
      image
    },
    }
  }`;
};

export const topicPostsQuery = (topic: string | string[], offset: number, limit: number) => {
  return `
  { "videos": *[_type == "post" && topic match '${topic}*'] | order(_createdAt desc) [${offset}...${limit}]{
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          image
        },
      likes,
      comments[] {
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          givenName,
          familyName,
          image
        },
      },
    },
    "total": count(*[_type == "post"])
  }`;
};
