import { gql } from '@apollo/client';

export const GET_QUOTE = gql`
  query GetQuote {
    quote {
      text
      author
    }
  }
`;

export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries($userId: ID!) {
    journalEntries(userId: $userId) {
      _id
      content
      mood
      createdAt
    }
  }
`;
