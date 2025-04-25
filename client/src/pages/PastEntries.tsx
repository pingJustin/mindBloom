import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import api from '../utils/api';

interface JournalEntry {
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState('');

  const fetchEntries = async () => {
    try {
      const res = await api.get('/journal');
      setEntries(res.data);
    } catch (err) {
      console.error('Error loading journal entries:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleStartUpdate = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setEditContent(entry.content);
    setEditMood(entry.mood || '');
  };

  const handleUpdate = async () => {
    if (!editingEntry) return;

    try {
      await api.put(`/journal/${editingEntry._id}`, {
        content: editContent,
        mood: editMood,
      });
      setEditingEntry(null);
      fetchEntries();
    } catch (err) {
      console.error('Error updating journal:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this entry?')) {
      try {
        await api.delete(`/journal/${id}`);
        fetchEntries();
      } catch (err) {
        console.error('Error deleting journal:', err);
      }
    }
  };

  return (
    <EntryList>
      <h2>Your Journal Entries</h2>
      {entries.map((entry) => (
        <EntryCard
          key={entry._id}
          mood={entry.mood}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {editingEntry?._id === entry._id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{ width: '100%', height: '100px', marginBottom: '0.5rem' }}
              />
              <select
                value={editMood}
                onChange={(e) => setEditMood(e.target.value)}
              >
                <option value="">Select Mood</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Anxious">Anxious</option>
                <option value="Excited">Excited</option>
                <option value="Calm">Calm</option>
              </select>
              <br />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingEntry(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>
                <strong>{dayjs(entry.date).format('MMM D, YYYY')}</strong>
                {entry.mood && ` – ${entry.mood}`}
              </p>
              <p>{entry.content}</p>
              <button onClick={() => handleStartUpdate(entry)}>Edit</button>
              <button onClick={() => handleDelete(entry._id)}>Delete</button>
            </>
          )}
        </EntryCard>
      ))}
    </EntryList>
  );
};

export default ViewPastEntries;
