import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayUsers from './DisplayUsers';
import DisplayMovies from './DisplayMovies';

import './App.css';

const BASE_URI = 'http://localhost:4000/'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: BASE_URI
  });

  return (
    <ApolloProvider client={client}>
    <div className='App'>
      <DisplayUsers/>
      <DisplayMovies/>
    </div>
    </ApolloProvider>
  )
}

export default App
