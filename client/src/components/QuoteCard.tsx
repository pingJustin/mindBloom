import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const QuoteContainer = styled.div`
  background: #f0f4f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-style: italic;
`;

interface Quote {
  q: string;
  a: string;
}

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({ q: '', a: '' });

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setQuote(data[0]);
        }
      })
      .catch((err) => console.error('Error fetching quote:', err));
  }, []);

  return (
    <QuoteContainer>
      <p>"{quote.q}"</p>
      <p>- {quote.a}</p>
    </QuoteContainer>
  );
};

export default QuoteCard;
