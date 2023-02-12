import {
    ADMIN_ROLE, BUILDER_ROLE,
    OWNER_ROLE, PAYMASTER_ROLE, WARRIOR_ROLE, WIZARD_ROLE,
} from "../constants";


import React, {useEffect, useState} from "react";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Admin} from "./admin/main";
import {Owner} from "./owner/main";
import {Builder} from "./builder/main";
import {getUserRole} from "../services/users";
import {Paymaster} from "./paymaster/main";
import {Warrior} from "./warrior/main";


export const HomePage = ({setToken}) => {
    const [userRole, setUserRole] = useState(null);
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
        case PAYMASTER_ROLE:
            return <Paymaster setToken={setToken}/>;
        case BUILDER_ROLE:
            return <Builder setToken={setToken}/>;
        case WARRIOR_ROLE:
            return <Warrior setToken={setToken}/>;
        case WIZARD_ROLE:
            return <h2>:(</h2>;
        default:
            return <h2></h2>;
    }
}

