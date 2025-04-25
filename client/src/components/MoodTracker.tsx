import React from 'react';
import styled from 'styled-components';

const MoodContainer = styled.div`
  margin: 1rem 0;
`;

const MoodButton = styled.button<{ selected: boolean }>`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ selected }) => (selected ? '#a0e7e5' : '#e0e0e0')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface Props {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

const moods = ['Happy', 'Sad', 'Anxious', 'Excited', 'Calm'];

const MoodTracker: React.FC<Props> = ({ selectedMood, setSelectedMood }) => {
  return (
    <MoodContainer>
      <h3>Select your mood:</h3>
      {moods.map((mood) => (
        <MoodButton
          key={mood}
          selected={selectedMood === mood}
          onClick={() => setSelectedMood(mood)}
        >
          {mood}
        </MoodButton>
      ))}
    </MoodContainer>
  );
};

export default MoodTracker;
