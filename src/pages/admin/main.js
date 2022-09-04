import {Route, Switch, useRouteMatch} from "react-router-dom";
import {HOME_ROUTE, AUDIT_ROUTE, NEW_USER_ROUTE, RESOURCES_ROUTE, USERS_ROUTE} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {AdminHome} from "./home";
import {AdminUsers} from "./users";
import {NewUser} from "./new_user";
import {Audit} from "./audit";
import {Resources} from "./resources";
import {logout} from "../../services/auth";


const AdminHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to={USERS_ROUTE}>
                        <Nav.Link>Пользователи</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={AUDIT_ROUTE}>
                        <Nav.Link>Сбор аудитных данных</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={RESOURCES_ROUTE}>
                        <Nav.Link>Активы замка</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => {
                        logout().then()
                    }}>Выйти</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}




export const Admin = () => {
    return (
        <div>
            <AdminHeader/>

            <Switch>
                <Route path={NEW_USER_ROUTE}>
                    <NewUser/>
                </Route>
                <Route path={USERS_ROUTE}>
                    <AdminUsers/>
                </Route>
                <Route path={AUDIT_ROUTE}>
                    <Audit/>
                </Route>
                <Route path={RESOURCES_ROUTE}>
                    <Resources/>
                </Route>
                <Route path={HOME_ROUTE}>
                    <AdminHome/>
                </Route>
            </Switch>
        </div>
    );
}
