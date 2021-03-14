import { gql } from "@apollo/client";

export const GET_ID_QUERY = gql`
  query GetStoryDraftID {
    GetStoryDraftID
  }
`;

export const GET_ALL_STORIES = gql`
  query GetAllStories($authorid: Int) {
    GetAllStories(authorid: $authorid) {
      content
      image_url
      title
      id
      authorid
      category
      date_created
    }
  }
`;
