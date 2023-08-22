const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type News {
    newsId: ID!
    sourceCountry: String
    text: String
    title: String
    language: String
    link: String
}

input NewsInput {
  newsId: ID!
  sourceCountry: String
  text: String
  title: String
  language: String
  link: String
}

  type Query {
    currentUser(email: String!): User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveNews(newNews: NewsInput!): User
    deleteNews(newsId: ID!): User
  }
`;

module.exports = typeDefs;
