import {Route, Switch} from "react-router-dom";
import {HOME_ROUTE, WARRIOR_NEW_RECRUIT_ROUTE, WIZARD_NEW_SPELL_ROUTE} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {PaymasterHome, WarriorHome, WizardHome} from "./home";
import {logout} from "../../services/auth";
import {NewRecruit, NewSpell} from "./new_spell";


const WizardHeader = ({setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                (Глава гильдии магов)
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


export const Wizard = ({setToken}) => {
    return (
        <div>
            <WizardHeader setToken={setToken}/>

            <Switch>
                <Route path={WIZARD_NEW_SPELL_ROUTE}>
                    <NewSpell/>
                </Route>
                <Route path={HOME_ROUTE}>
                    <WizardHome/>
                </Route>
            </Switch>
        </div>
    );
}
