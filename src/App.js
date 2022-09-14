import './App.css';
import React, {useState} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import {Login} from "./pages/login";
import {Home} from "./pages/home";
import {getToken} from "./services/auth";


export const App = () => {
    const [token, setToken] = useState(getToken())
    console.log("Token:", token)

    return (
        <Router>
            <Switch>
                {token != null && <Redirect from="/login" to="/"/>}
                <Route path="/login">
                    <Login setToken={setToken}/>
                </Route>
                {token == null && <Redirect to="/login"/>}
                <Route path="/home">
                    <Home setToken={setToken}/>
                </Route>
                <Redirect from="/" to="/home"/>}
            </Switch>
        </Router>
    );
}
