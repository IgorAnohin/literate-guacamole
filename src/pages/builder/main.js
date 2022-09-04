import {Route, Switch} from "react-router-dom";
import {
    HOME_ROUTE,
    BUILDER_BUILDING_ROUTE, BUILDER_NEW_BUILDING_ROUTE, BUILDER_TAKE_ORDER_ROUTE
} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Orders} from "./orders";


const BuilderHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to={HOME_ROUTE}>
                        <Nav.Link>Заказы</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={BUILDER_BUILDING_ROUTE}>
                        <Nav.Link>База зданий</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => {
                        console.log("HERE")
                    }}>Выйти</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}


export const Builder = () => {
    return (
        <div>
            <BuilderHeader/>

            <Switch>
                <Route path={BUILDER_NEW_BUILDING_ROUTE}>
                    LOL1
                </Route>
                <Route path={BUILDER_BUILDING_ROUTE}>
                    LOL2
                </Route>
                <Route path={BUILDER_TAKE_ORDER_ROUTE}>
                    LOL3
                </Route>
                <Route path={HOME_ROUTE}>
                    <Orders/>
                </Route>
            </Switch>
        </div>
    );
}
