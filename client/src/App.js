import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';

import Nav from "./components/Nav";

import Home from "./pages/HomePage";
import Products from "./pages/Products";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import OrderHistory from "./pages/OrderHistory";

import store from './utils/store';

const client = new ApolloClient({
    request: (operation) => {
        const token = localStorage.getItem('id_token');
        
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    },
    uri: '/graphql',
})

function App() {
    return (
        <ApolloProvider client={client}>
        <Router>
            <div>
            <Provider store={store}>
                <Nav />
                <Switch>
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Signup" component={Signup} />
                    <Route exact path="/OrderHistory" component={OrderHistory} />
                    <Route exact path="/Products" component={Products} />
                </Switch>
            </Provider>
            </div>
        </Router>
        </ApolloProvider>
    );
}

export default App;