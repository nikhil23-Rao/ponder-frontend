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

export const SORT_BY_DRAFTS = gql`
  query SortByDraft($authorid: String) {
    SortByDraft(authorid: $authorid) {
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

export const SORT_BY_PUBLISHED = gql`
  query SortByPublished($authorid: String) {
    SortByPublished(authorid: $authorid) {
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

export const GET_SEARCHABLE_STORIES = gql`
  query GetSearchableStories {
    GetSearchableStories {
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

export const GET_STORIES_HOME = gql`
  query GetStoriesHome {
    GetStoriesHome {
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

export const GET_PROFILE = gql`
  query GetProfile($authorid: String) {
    GetProfile(authorid: $authorid) {
      id
      username
      email
      bio
      image_url
    }
  }
`;

export const GET_PROFILE_INFO = gql`
  query GetProfileInfo($authorid: String) {
    GetProfileInfo(authorid: $authorid)
  }
`;
