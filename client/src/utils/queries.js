import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email) {
      _id
      email
      firstName
      lastName
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

export const QUERY_NEWS = gql`
  query getNews {
    news {
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
`;
