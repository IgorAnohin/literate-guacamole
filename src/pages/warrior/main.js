import {Route, Switch} from "react-router-dom";
import {HOME_ROUTE, WARRIOR_NEW_RECRUIT_ROUTE} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {PaymasterHome, WarriorHome} from "./home";
import {logout} from "../../services/auth";
import {NewRecruit} from "./new_recruit";


const WarriorHeader = ({setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                (Генерал казарм)
                <Nav>
                    <Nav.Link onClick={() => {
                        logout().then((success) => {
                            if (success) {
                                setToken(null);
                            }
                        }).catch(error => console.log("Error", error))
                    }}>Выйти</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}


export const Warrior = ({setToken}) => {
    return (
        <div>
            <WarriorHeader setToken={setToken}/>

            <Switch>
                <Route path={WARRIOR_NEW_RECRUIT_ROUTE}>
                    <NewRecruit/>
                </Route>
                <Route path={HOME_ROUTE}>
                    <WarriorHome/>
                </Route>
            </Switch>
        </div>
    );
}
