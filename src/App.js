import './App.css';
import React, {useState} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {LoginPage} from "./pages/login";
import {HomePage} from "./pages/home";
import {getToken} from "./services/auth";


export const App = () => {
    const [token, setToken] = useState(getToken())
    console.log("Token:", token)

    return (
        <div>
            <Router>
                <Switch>
                    {token != null && <Redirect from="/login" to="/"/>}
                    <Route path="/login">
                        <LoginPage setToken={setToken}/>
                    </Route>
                    {token == null && <Redirect to="/login"/>}
                    <Route path="/home">
                        <HomePage setToken={setToken}/>
                    </Route>
                    <Redirect from="/" to="/home"/>}
                </Switch>
                <ToastContainer />
            </Router>
        </div>
    );
}
