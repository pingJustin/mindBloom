import React, { useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import MoodTracker from '../components/MoodTracker';
import JournalEntry from '../components/JournalEntry';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Dashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');

  return (
    <PageWrapper>
      <h1>Welcome back 🌿</h1>
      <QuoteCard />
      <MoodTracker selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
      <JournalEntry mood={selectedMood} />
    </PageWrapper>
  );
};

export default Dashboard;