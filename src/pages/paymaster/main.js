import {Route, Switch} from "react-router-dom";
import {HOME_ROUTE} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../../services/auth";
import {ResourcesList} from "../../widgets/ResourcesList";


const PaymasterHeader = ({setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                (Казначей)
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


export const Paymaster = ({setToken}) => {
    return (
        <div>
            <PaymasterHeader setToken={setToken}/>

            <Switch>
                <Route path={HOME_ROUTE}>
                    <ResourcesList changeAmountAvailable={true}/>
                </Route>
            </Switch>
        </div>
    );
}
