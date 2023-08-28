import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      currentUser {
        email
        firstName
        lastName
        _id
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userDefaultNews: String
    $selectedCountry: String
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userDefaultNews: $userDefaultNews
      selectedCountry: $selectedCountry
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

export const SAVE_NEWS = gql`
  mutation saveNews($newNews: NewsInput!) {
    saveNews(newNews: $newNews) {
      _id
      email
      savedNews {
        newsId
        title
        summary
        source_country
        url
        image
        language
        latest_publish_date
      }
      token
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation deleteNews($newsId: ID!) {
    deleteNews(newsId: $newsId) {
      _id
      email
      savedNews {
        newsId
        title
        summary
        source_country
        url
        image
        language
        latest_publish_date
      }
    }
  }
`;


