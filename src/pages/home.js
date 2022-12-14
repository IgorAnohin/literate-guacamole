import {
    ADMIN_ROLE, BUILDER_ROLE,
    OWNER_ROLE, WARRIOR_ROLE, WIZARD_ROLE,
} from "../constants";


import React, {useEffect, useState} from "react";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Admin} from "./admin/main";
import {Owner} from "./owner/main";
import {Builder} from "./builder/main";
import {getUserRole} from "../services/users";


export const Home = ({setToken}) => {
    const [userRole, setUserRole] = useState();
    useEffect(() => {
            getUserRole().then((role) => setUserRole(role))
        },
        []
    )

    console.log("User role", userRole);

    switch (userRole) {
        case ADMIN_ROLE:
            return <Admin setToken={setToken}/>;
        case OWNER_ROLE:
            return <Owner setToken={setToken}/>;
        case BUILDER_ROLE:
            return <Builder setToken={setToken}/>;
        case WARRIOR_ROLE:
            return <h2>:(</h2>;
        case WIZARD_ROLE:
            return <h2>:(</h2>;
        default:
            return <h2></h2>;
    }
}

