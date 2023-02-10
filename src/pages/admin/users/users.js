import {useHistory} from "react-router-dom";
import {EDIT_USER_ROUTE, NEW_USER_ROUTE} from "../../../constants";
import {Button} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../../services/users";


export const AdminUsers = () => {

    const history = useHistory();

    const columns = [{
        dataField: 'name',
        text: 'Пользователь',
    }, {
        dataField: 'email',
        text: 'Почта'
    }, {
        dataField: 'role',
        text: 'Роль',
    }, {
        dataField: 'last_enter',
        text: 'Последний вход',
    }];


    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then((newUsers) => setUsers(newUsers))
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
                    history.push(NEW_USER_ROUTE)
                }}>Добавить нового пользователя</Button>
            </div>
            <BootstrapTable classes={"table-hover"} keyField='name' data={users} columns={columns}
                            rowEvents={ tableRowEvents }
            />
        </div>
    );
}

