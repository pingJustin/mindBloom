import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Entry {
    _id: ID!
    content: String
    mood: String
    date: String
    email: String
  }
  
  type User {
    _id: ID
    username: String
    email: String
    entries: [Entry]
  }

  type Auth {
    token: ID!
    user: User
  }

  input EntryInput {
    content: String
    mood: String
    date: String
    email: String
  }
   
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String, email: String!, password: String!): Auth
    addEntry(entryData: EntryInput!): User
    removeEntry(entryId: ID!): User
  }
`;

export default typeDefs;