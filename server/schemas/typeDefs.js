const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    savedNews: [News]
    userDefaultNews: String
    selectedCountry: String
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type News {
    newsId: ID!
    title: String
    summary: String
    source_country: String
    url: String
    image: String
    language: String
    latest_publish_date: String
}

input NewsInput {
    newsId: ID!
    title: String
    summary: String
    source_country: String
    url: String
    image: String
    language: String
    latest_publish_date: String
}

  type Query {
    currentUser(email: String!): User
    news: [News]!
  }

type Mutation {
  register(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userDefaultNews: String 
    selectedCountry: String  
  ): Auth
  login(email: String!, password: String!): Auth
  saveNews(saveNews: NewsInput!): Auth
  deleteNews(newsId: ID!): User
}


type Mutatioin {
  forgotPassword(email: String!): ForgotPasswordResponse!
}

type ForgotPasswordResponse {
  success: Boolean!
  message: String!
}

type Mutation {
  tesetPassword(token: String!, newPassword: String!): ResetPasswordResponse!
}

type ResetPasswordReesponse {
  success: Boolean!
  messge: String!
}
`;

module.exports = typeDefs;
