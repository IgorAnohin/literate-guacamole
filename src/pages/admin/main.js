import {Route, Switch} from "react-router-dom";
import {
    HOME_ROUTE,
    AUDIT_ROUTE,
    NEW_USER_ROUTE,
    ASSETS_ROUTE,
    USERS_ROUTE,
    EDIT_USER_ROUTE,
    ASSET_DEFINITIONS_ROUTE
} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {AdminHome} from "./home";
import {AdminUsers} from "./users";
import {NewUser} from "./new_user";
import {Audit} from "./audit";
import {Assets} from "./assets";
import {logout} from "../../services/auth";
import {EditUser} from "./edit_user";
import {AssetDefinitions} from "./asset_definitions";


const AdminHeader = ({setToken}) => {
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
                    <LinkContainer to={ASSETS_ROUTE}>
                        <Nav.Link>Активы замка</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={ASSET_DEFINITIONS_ROUTE}>
                        <Nav.Link>Определения активов</Nav.Link>
                    </LinkContainer>
                </Nav>
                (Администратор)
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




export const Admin = ({setToken}) => {
    return (
        <div>
            <AdminHeader setToken={setToken}/>

            <Switch>
                <Route path={EDIT_USER_ROUTE(":userId")}>
                    <EditUser/>
                </Route>
                <Route path={NEW_USER_ROUTE}>
                    <NewUser/>
                </Route>
                <Route path={USERS_ROUTE}>
                    <AdminUsers/>
                </Route>
                <Route path={AUDIT_ROUTE}>
                    <Audit/>
                </Route>
                <Route path={ASSETS_ROUTE}>
                    <Assets/>
                </Route>
                <Route path={ASSET_DEFINITIONS_ROUTE}>
                    <AssetDefinitions/>
                </Route>
                <Route path={HOME_ROUTE}>
                    <AdminHome/>
                </Route>
            </Switch>
        </div>
    );
}
