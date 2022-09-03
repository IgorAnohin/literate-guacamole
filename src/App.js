import './App.css';
import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, Link,
} from "react-router-dom";

import {Login} from "./pages/login";
import {Home} from "./pages/home";
import {getToken} from "./services/auth";


export default class App extends React.Component {
    render() {
        console.log("HERE");

        return (
            <Router>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to="/">Home</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/about">About</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/users">Users</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    {/*{getToken() == null && <Redirect to="/login"/>}*/}
                    {/*{getToken() != null && <Redirect from="/login" to="/"/>}*/}
                    <Redirect from="/" to="/home"/>}
                </Switch>
            </Router>
        );
    }
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}