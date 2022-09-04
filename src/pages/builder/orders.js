import {BUILDER_TAKE_ORDER_ROUTE, BUILDING_STATUS_IN_CREATED, OWNER_NEW_BUILDING_ORDER_ROUTE} from "../../constants";
import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

export const Orders = () => {
    const history = useHistory();

    const columns = [{
        dataField: 'name',
        text: 'Здание'
    }, {
        dataField: 'place',
        text: 'Место в очереди строительство'
    }, {
        dataField: 'status',
        text: 'Статус',
    },];
    const products = [
        {id: "123", name: "Капитолий", place: 1, status: BUILDING_STATUS_IN_CREATED},
        {id: "123", name: "Капитолий 2", place: 2, status: BUILDING_STATUS_IN_CREATED},
        {id: "123", name: "Капитолий 3", place: 3, status: BUILDING_STATUS_IN_CREATED},
        {id: "123", name: "Капитолий 4", place: 4, status: BUILDING_STATUS_IN_CREATED},
    ];


    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(BUILDER_TAKE_ORDER_ROUTE)
                }}>Рассмотреть заказ</Button>
            </div>
            <BootstrapTable keyField='id' data={products} columns={columns}/>
        </div>
    );
}
