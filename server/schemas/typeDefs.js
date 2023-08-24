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

type Country {
  countryId: ID!
  countries: [String]
}

input CountryInput {
  countryId: ID!
  countries: [String]
}

  type Query {
    currentUser(email: String!): User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveNews(newNews: NewsInput!): User
    deleteNews(newsId: ID!): User

    saveCountry(newCountry: CountryInput!): User
    deleteCountry(countryId: ID!): User
  }
`;

module.exports = typeDefs;
