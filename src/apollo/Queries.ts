import { gql } from "@apollo/client";

// Get Todays Stories Query
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
      likes
      authorName
      authorImage
    }
  }
`;

// Get All Stories Query
export const GET_ALL_STORIES = gql`
  query GetAllStories($authorid: String) {
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

// Read Story Query
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
      authorName
      authorImage
    }
  }
`;

// Get The Draft We Are Trying To Edit Query
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

// Search Query
export const SEARCH = gql`
  query Search($query: String) {
    Search(query: $query) {
      content
      image_url
      title
      id
      authorid
      category
      date_created
      likedBy
      authorName
      authorImage
    }
  }
`;
