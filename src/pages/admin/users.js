import {PersonX} from "react-bootstrap-icons";
import {useHistory} from "react-router-dom";
import {ADMIN_ROLE, NEW_USER_ROUTE, ROLES, roleToReadable} from "../../constants";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import {Button} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {getResources} from "../../services/resources";
import {getUsers, updateUser} from "../../services/users";

function deleteUserFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div
            style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal"
            }}>

            <PersonX/>
        </div>
    );
}

export const AdminUsers = () => {

    const history = useHistory();

    const roleOptions = ROLES.map((role) => {
        return {
            value: role,
            label: roleToReadable[role],
        };
    });

    const columns = [{
        dataField: 'id',
        text: 'Идентификатор',
        editable: false,
    }, {
        dataField: 'email',
        text: 'Почта'
    }, {
        dataField: 'role',
        text: 'Роль',
        editor: {
            type: Type.SELECT,
            options: roleOptions,
        },
        validator: (newValue, row, column) => {
            console.log("New value");

            updateUser().then(r => {})

            return true;
        },
    }, {
        dataField: "edit",
        text: "Удалить пользователя",
        sort: false,
        formatter: deleteUserFormatter,
        attrs: {width: 50},
        editable: false,
    },];


    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then((newUsers) => setUsers(newUsers))
    }, [])


    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(NEW_USER_ROUTE)
                }}>Добавить нового пользователя</Button>
            </div>
            <BootstrapTable keyField='id' data={users} columns={columns}
                            cellEdit={cellEditFactory({
                                mode: 'click', blurToSave: true
                            })}/>
        </div>
    );

}

