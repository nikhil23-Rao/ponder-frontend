import { gql } from "@apollo/client";

export const GET_ID_QUERY = gql`
  query GetStoryDraftID {
    GetStoryDraftID
  }
`;

export const GET_ALL_STORIES = gql`
  query GetAllStories {
    GetAllStories {
      content
      image_url
      title
      id
    }
  }
`;
