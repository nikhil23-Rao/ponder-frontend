import { gql } from "@apollo/client";

export const GET_TODAYS_STORIES = gql`
  query GetTodaysStories {
    GetTodaysStories {
      content
      image_url
      title
      id
      authorid
      date_created
      category
    }
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
      date_created
      category
      likes
    }
  }
`;

export const READ_STORY = gql`
  query ReadStory($storyid: String) {
    ReadStory(storyid: $storyid) {
      content
      image_url
      title
      id
      authorid
      category
      date_created
      likedBy
    }
  }
`;

export const GET_EDIT_DRAFT = gql`
  query GetEditDraft($storyid: String) {
    GetEditDraft(storyid: $storyid) {
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
