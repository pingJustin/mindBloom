// export default ViewPastEntries;
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';

const GET_ENTRIES = gql`
  query GetEntries($email: String!) {
    entriesByEmail(email: $email) {
      _id
      content
      mood
      date
    }
  }
`;

interface Entry {
  _id: string;
  content: string;
  mood?: string;
  date: string;
}

const EntryList = styled.div`
  margin-top: 1.5rem;
`;

const EntryCard = styled(motion.div)<{ mood?: string }>`
  background: #fff;
  border-left: 6px solid ${({ mood }) => getMoodColor(mood)};
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const getMoodColor = (mood?: string) => {
  switch (mood) {
    case 'Happy': return '#fce38a';
    case 'Sad': return '#dbe9ee';
    case 'Anxious': return '#f6caca';
    case 'Excited': return '#b9d8c2';
    case 'Calm': return '#e6f2f2';
    default: return '#ccc';
  }
};

const ViewPastEntries: React.FC = () => {
  const email = localStorage.getItem('email'); // or use context if preferred

  const { loading, error, data } = useQuery(GET_ENTRIES, {
    variables: { email },
    skip: !email,
  });

  if (!email) return <p>Please log in to view entries.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading entries.</p>;

  return (
    <EntryList>
      {data.entriesByEmail.map((entry: Entry) => (
        <EntryCard
          key={entry._id}
          mood={entry.mood}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <strong>{dayjs().format('MMM D, YYYY')}</strong>
          <p><em>{entry.mood}</em></p>
          <p>{entry.content}</p>
        </EntryCard>
      ))}
    </EntryList>
  );
};

export default ViewPastEntries;
