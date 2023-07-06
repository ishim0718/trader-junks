import React from 'react';
import Home from './pages/Home';
import User from './pages/User';
import Search from './pages/SearchItems';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Checkout from './pages/Checkout';

const client = new ApolloClient({
  uri: '/graphql',
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
              path="/searchItems" 
              element={<Search />} 
            />
            </Routes>
            <Route 
              path="/Checkout" 
              element={<Checkout />} 
            />
            </Routes>
        </StoreProvider>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
