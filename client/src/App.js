import React from 'react';
import Home from './pages/Home';
import User from './pages/User';
import Search from './pages/Products';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Checkout from './pages/Checkout';
import { StoreProvider } from './utils/GlobalState';
import Nav from './Components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/User" 
                element={<User />} 
              />
              <Route 
                path="/products" 
                element={<Search />} 
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
