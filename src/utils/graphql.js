import gql from 'graphql-tag';

export  const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    username
    createdAt
    body
    likeCount
    commentCount
    likes {
      username
    }
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;