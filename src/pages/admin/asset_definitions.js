import {useHistory} from "react-router-dom";
import {EDIT_USER_ROUTE, NEW_ASSET_DEFINITIONS_ROUTE, NEW_USER_ROUTE} from "../../constants";
import {Button} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../services/users";


export const AssetDefinitions = () => {

    const history = useHistory();

    const columns = [{
        dataField: 'name',
        text: 'Наименование',
    }, {
        dataField: 'category',
        text: 'Категория'
    }];


    const [users, setUsers] = useState([])

    useEffect(() => {
        getAssetDefs().then((newUsers) => setUsers(newUsers))
    }, [])

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            const user = users[rowIndex];
            history.push(EDIT_USER_ROUTE(user.id))
        },
    }

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(NEW_ASSET_DEFINITIONS_ROUTE)
                }}>Добавить определение актива</Button>
            </div>
            <BootstrapTable classes={"table-hover"} keyField='name' data={users} columns={columns}
                            rowEvents={ tableRowEvents }
            />
        </div>
    );
}
