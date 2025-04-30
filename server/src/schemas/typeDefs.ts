const typeDefs = `#graphql
  type Entry {
    _id: ID!
    content: String
    mood: String
    email: String
    date: String
  }

  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    allEntries: [Entry]
    entriesByEmail(email: String!): [Entry]
  }

  type Mutation {
    addEntry(content: String, mood: String, email: String!): Entry
    signup(email: String!, password: String!): AuthPayload!
  }
`;

export default typeDefs;
