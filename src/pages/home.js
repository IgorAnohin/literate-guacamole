import {getRole} from "../services/auth";
import {
    ADMIN_HOME_ROUTE,
    ADMIN_ROLE,
    AUDIT_ROUTE, NEW_USER_ROUTE,
    OWNER_ROLE,
    RESOURCES_ROUTE, ROLES, roleToReadable,
    USERS_ROUTE
} from "../constants";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import {Button, Container, Col, Image, Nav, Navbar, NavDropdown, Row, Card, CardGroup} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {PersonX} from 'react-bootstrap-icons';


import React from "react";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Admin} from "./admin/main";


export const Home = () => {
    // const role = getRole();
    const role = ADMIN_ROLE;
    switch (role) {
        case ADMIN_ROLE:
            return <Admin/>;
        case OWNER_ROLE:
            return <h2>Owner Home</h2>;
        default:
            return <h2>:(</h2>;
    }
}

