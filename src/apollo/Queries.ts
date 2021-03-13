import { gql } from "@apollo/client";

export const GET_ID_QUERY = gql`
  query GetStoryDraftID {
    GetStoryDraftID
  }
`;

export const GET_ALL_STORIES = gql`
  query GetAllStories($limit: Int, $offset: Int) {
    GetAllStories(limit: $limit, offset: $offset) {
      content
      image_url
      title
      id
      author {
        id
        username
        email
      }
      category
      date_created
    }
  }
`;
