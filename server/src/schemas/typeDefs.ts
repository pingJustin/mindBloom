import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Entry {
    entryId: String!
    content: String
    mood: String
    date: String
  }
  

  type User {
    _id: ID
    email: String
    entries: [Entry]
  }

  type Auth {
    token: ID!
    user: User
  }

  input EntryInput {
    entryId: String!
    content: String
    mood: String
    date: String
    }
   
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser( email: String!, password: String!): Auth
    addEntry(entryData: EntryInput!): User
    removeEntry(entryId: String!): User
  }
`;

export default typeDefs;