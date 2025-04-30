// export default App;
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar'; // Replace with your header if different
import Footer from './components/Footer'; // Create if missing

const client = new ApolloClient({
  uri: '/graphql', // Backend GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
