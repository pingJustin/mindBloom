import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Quicksand:wght@400;600&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #f5f3ef;
    color: #444c46;
    font-family: 'Quicksand', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    font-family: 'Lora', serif;
    font-weight: 600;
    color: #444c46;
    margin-top: 0;
    line-height: 1.3;
  }

  h1 {
    font-size: 2rem;

    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }

  h2 {
    font-size: 1.5rem;

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (max-width: 480px) {
      padding: 0.4rem 0.75rem;
      font-size: 0.95rem;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;

    @media (max-width: 480px) {
      padding: 0.5rem;
    }
  }

  ::selection {
    background: #b9d8c2;
    color: #000;
  }

  /* Responsive layout containers */
  .container {
    max-width: 700px;
    margin: 0 auto;
    padding: 1.5rem;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    @media (max-width: 480px) {
      padding: 0.75rem;
    }
  }
`;

export default GlobalStyles;
