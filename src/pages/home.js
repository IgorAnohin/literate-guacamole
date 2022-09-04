import {
    ADMIN_ROLE, BUILDER_ROLE,
    OWNER_ROLE, WARRIOR_ROLE, WIZARD_ROLE,
} from "../constants";


import React from "react";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Admin} from "./admin/main";
import {Owner} from "./owner/main";
import {Builder} from "./builder/main";


export const Home = () => {
    // const role = getRole();
    const role = ADMIN_ROLE;
    // const role = OWNER_ROLE;
    // const role = BUILDER_ROLE;

    switch (role) {
        case ADMIN_ROLE:
            return <Admin/>;
        case OWNER_ROLE:
            return <Owner/>;
        case BUILDER_ROLE:
            return <Builder/>;
        case WARRIOR_ROLE:
            return <h2>:(</h2>;
        case WIZARD_ROLE:
            return <h2>:(</h2>;
        default:
            return <h2>:(((((((</h2>;
    }
}

