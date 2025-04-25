import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const EntryForm = styled.div`
  margin-top: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #b9d8c2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface Props {
  mood: string;
}

const JournalEntry: React.FC<Props> = ({ mood }) => {
  const [content, setContent] = useState<string>('');

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await api.post('/journal', { content, mood });
      setContent('');
      alert('Entry submitted!');
    } catch (err) {
      console.error('Error saving journal entry:', err);
    }
  };

  return (
    <EntryForm>
      <h3>Write about your day:</h3>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Today I felt..."
      />
      <SubmitButton onClick={handleSubmit}>Submit Entry</SubmitButton>
    </EntryForm>
  );
};

export default JournalEntry;
