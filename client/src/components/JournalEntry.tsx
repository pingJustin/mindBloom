// export default JournalEntry;
import React, { useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

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

const ADD_ENTRY = gql`
  mutation AddEntry($content: String, $mood: String, $email: String!) {
    addEntry(content: $content, mood: $mood, email: $email) {
      _id
      content
      mood
      date
    }
  }
`;

interface Props {
  mood: string;
}

const JournalEntry: React.FC<Props> = ({ mood }) => {
  const [content, setContent] = useState<string>('');
  const email = localStorage.getItem('email'); // or use from context if preferred

  const [addEntry, { loading, error }] = useMutation(ADD_ENTRY);

  const handleSubmit = async () => {
    if (!content.trim() || !email) return;
    try {
      await addEntry({
        variables: {
          content,
          mood,
          email,
        },
      });
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
        placeholder="Today I..."
      />
      <SubmitButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Entry'}
      </SubmitButton>
      {error && <p style={{ color: 'red' }}>Submission failed. Try again.</p>}
    </EntryForm>
  );
};

export default JournalEntry;
