import {Route, Switch} from "react-router-dom";
import {
    HOME_ROUTE,
    OWNER_RESOURCES_ROUTE,
    OWNER_BUILDING_ROUTE,
    OWNER_NEW_BUILDING_ORDER_ROUTE,
    OWNER_RECRUITS_ROUTE, OWNER_SPELLS_ROUTE
} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {OwnerHome} from "./home";
import {Resources} from "../admin_owner_common/resources";
import {Building} from "./building";
import {NewBuildingOrder} from "./new_building_order";
import {logout} from "../../services/auth";
import {SpellsList} from "../../widgets/SpellsList";
import {RecruitsList} from "../../widgets/RecruitsList";


const OwnerHeader = ({setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand> Система хранения и учёта замковых активов</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to={OWNER_BUILDING_ROUTE}>
                        <Nav.Link>Строительство</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_RECRUITS_ROUTE}>
                        <Nav.Link>Рекруты</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_RESOURCES_ROUTE}>
                        <Nav.Link>Ресурсы</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_SPELLS_ROUTE}>
                        <Nav.Link>зкалинания</Nav.Link>
                    </LinkContainer>
                </Nav>
                (Владелец замка)
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


export const Owner = ({setToken}) => {
    return (
        <div>
            <OwnerHeader setToken={setToken}/>

            <Switch>
                <Route path={OWNER_NEW_BUILDING_ORDER_ROUTE}>
                    <NewBuildingOrder/>
                </Route>
                <Route path={OWNER_BUILDING_ROUTE}>
                    <Building/>
                </Route>
                <Route path={OWNER_RECRUITS_ROUTE}>
                    <RecruitsList changeAmountAvailable={false} removeAvailable={false}/>
                </Route>
                <Route path={OWNER_RESOURCES_ROUTE}>
                    <Resources/>
                </Route>
                <Route path={OWNER_SPELLS_ROUTE}>
                    <SpellsList changeAmountAvailable={false} removeAvailable={false}/>
                </Route>
                <Route path={HOME_ROUTE}>
                    <OwnerHome/>
                </Route>
            </Switch>
        </div>
    );
}
