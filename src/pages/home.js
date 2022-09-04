import {
    ADMIN_ROLE,
    OWNER_ROLE,
} from "../constants";


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

