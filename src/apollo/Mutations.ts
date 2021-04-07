// GQL Formatter Imported
import { gql } from "@apollo/client";

// Register Mutation
export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $id: String
  ) {
    Register(username: $username, email: $email, password: $password, id: $id)
  }
`;

// OAuthRegister Mutation
export const OAUTH_REGISTER_USER = gql`
  mutation OAuthRegister(
    $username: String!
    $email: String!
    $image_url: String
    $id: String
  ) {
    OAuthRegister(
      username: $username
      email: $email
      id: $id
      image_url: $image_url
    )
  }
`;

// Login Mutation
export const LOGIN_USER = gql`
  mutation Register($email: String!, $password: String!) {
    Login(email: $email, password: $password)
  }
`;

// OAuth Login Mutation
export const OAUTH_LOGIN_USER = gql`
  mutation OAuthLogin($email: String!) {
    OAuthLogin(email: $email)
  }
`;

// Save Draft Mutation
export const SAVE_DRAFT = gql`
  mutation SaveDraft(
    $title: String!
    $authorid: String
    $content: String!
    $image_url: String
    $category: String
    $date_created: [String]
    $id: String
  ) {
    SaveDraft(
      title: $title
      authorid: $authorid
      image_url: $image_url
      content: $content
      category: $category
      date_created: $date_created
      id: $id
    )
  }
`;

// Publish Story Mutation
export const PUBLISH_STORY = gql`
  mutation PublishStory(
    $title: String!
    $authorid: String
    $content: String!
    $image_url: String
    $category: String
    $date_created: [String]
    $id: String
  ) {
    PublishStory(
      title: $title
      authorid: $authorid
      image_url: $image_url
      content: $content
      category: $category
      date_created: $date_created
      id: $id
    )
  }
`;

// Like Story Mutation
export const LIKE_STORY = gql`
  mutation LikeStory($storyid: String, $authorid: String) {
    LikeStory(storyid: $storyid, authorid: $authorid)
  }
`;

// Edit Draft Mutation
export const EDIT_DRAFT = gql`
  mutation EditDraft(
    $title: String!
    $content: String!
    $image_url: String
    $category: String
    $date_created: [String]
    $storyid: String
  ) {
    EditDraft(
      title: $title
      image_url: $image_url
      content: $content
      category: $category
      date_created: $date_created
      storyid: $storyid
    )
  }
`;

// Delete Draft Once The Draft Was Published Mutation
export const DELETE_DRAFT_ONCE_PUBLISHED = gql`
  mutation DeleteDraftOncePublished($storyid: String) {
    DeleteDraftOncePublished(storyid: $storyid)
  }
`;

// Delete Published Story
export const DELETE = gql`
  mutation Delete($storyid: String) {
    Delete(storyid: $storyid)
  }
`;

// Update Profile
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($authorid: String, $bio: String, $image_url: String) {
    UpdateProfile(authorid: $authorid, bio: $bio, image_url: $image_url)
  }
`;
