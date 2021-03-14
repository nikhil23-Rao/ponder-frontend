// GQL Formatter Imported
import { gql } from "@apollo/client";

// Register Mutation
export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    Register(username: $username, email: $email, password: $password)
  }
`;

// OAuthRegister Mutation
export const OAUTH_REGISTER_USER = gql`
  mutation OAuthRegister($username: String!, $email: String!) {
    OAuthRegister(username: $username, email: $email)
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
export const SAVE_DRAFT_CONTENT = gql`
  mutation SaveDraftContent(
    $content: String
    $authorid: Int
    $date_created: String
  ) {
    SaveDraftContent(
      content: $content
      authorid: $authorid
      date_created: $date_created
    )
  }
`;

export const SAVE_DRAFT_TITLE_AND_IMAGEURL = gql`
  mutation SaveDraftTitleAndImageUrl(
    $id: Int!
    $title: String
    $image_url: String
    $category: String
  ) {
    SaveDraftTitleAndImageUrl(
      id: $id
      title: $title
      image_url: $image_url
      category: $category
    )
  }
`;
