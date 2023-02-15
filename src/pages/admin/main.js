import {Route, Switch} from "react-router-dom";
import {
    HOME_ROUTE,
    AUDIT_ROUTE,
    NEW_USER_ROUTE,
    ADMIN_RESOURCES_ROUTE,
    USERS_ROUTE,
    EDIT_USER_ROUTE,
    ASSET_DEFINITIONS_ROUTE,
    NEW_ASSET_DEFINITIONS_ROUTE,
    EDIT_ASSET_DEFINITIONS_ROUTE,
    OWNER_RECRUITS_ROUTE,
    OWNER_RESOURCES_ROUTE, OWNER_BUILDINGS_ROUTE, OWNER_SPELLS_ROUTE
} from "../../constants";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {AdminHome} from "./home";
import {AdminUsers} from "./users/users";
import {NewUser} from "./users/new_user";
import {Audit} from "./audit";
import {Resources} from "../admin_owner_common/resources";
import {logout} from "../../services/auth";
import {EditUser} from "./users/edit_user";
import {AssetDefinitions} from "./assetDefs/asset_definitions";
import {NewAssetDefinition} from "./assetDefs/new_asset_definition";
import {EditAssetDefinition} from "./assetDefs/edit_asset_definition";
import {RecruitsList} from "../../widgets/RecruitsList";
import {ResourcesList} from "../../widgets/ResourcesList";
import {BuildingsList} from "../../widgets/BuildingsList";
import {SpellsList} from "../../widgets/SpellsList";


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
                    {/*<LinkContainer to={ADMIN_RESOURCES_ROUTE}>*/}
                    {/*    <Nav.Link>Активы замка</Nav.Link>*/}
                    {/*</LinkContainer>*/}
                    <LinkContainer to={OWNER_RECRUITS_ROUTE}>
                        <Nav.Link>Рекруты</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_RESOURCES_ROUTE}>
                        <Nav.Link>Ресурсы</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_SPELLS_ROUTE}>
                        <Nav.Link>Заклинания</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={OWNER_BUILDINGS_ROUTE}>
                        <Nav.Link>Здания</Nav.Link>
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
                {/*<Route path={ADMIN_RESOURCES_ROUTE}>*/}
                {/*    <Resources/>*/}
                {/*</Route>*/}
                <Route path={OWNER_RECRUITS_ROUTE}>
                    <RecruitsList changeAmountAvailable={false} removeAvailable={false}/>
                </Route>
                <Route path={OWNER_RESOURCES_ROUTE}>
                    <ResourcesList changeAmountAvailable={true} onlyDecrease={false}/>
                </Route>
                <Route path={OWNER_BUILDINGS_ROUTE}>
                    <BuildingsList/>
                </Route>
                <Route path={OWNER_SPELLS_ROUTE}>
                    <SpellsList changeAmountAvailable={false} removeAvailable={false}/>
                </Route>
                <Route path={EDIT_ASSET_DEFINITIONS_ROUTE(":assetDefinitionId")}>
                    <EditAssetDefinition/>
                </Route>
                <Route path={NEW_ASSET_DEFINITIONS_ROUTE}>
                    <NewAssetDefinition/>
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
