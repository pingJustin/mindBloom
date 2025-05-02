// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const ADD_JOURNAL_ENTRY = gql`
  mutation AddJournalEntry($content: String!, $mood: String!) {
    addJournalEntry(content: $content, mood: $mood, email: $email) {
      _id
      content
      mood
      createdAt
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($entryId: ID!) {
    deleteJournalEntry(entryId: $entryId) {
      _id
    }
  }
`;
