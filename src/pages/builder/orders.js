import {BUILDER_TAKE_ORDER_ROUTE, BUILDING_STATUS_IN_CREATED, OWNER_NEW_BUILDING_ORDER_ROUTE} from "../../constants";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {getBuildingOrders} from "../../services/building_orders";

export const Orders = () => {
    const history = useHistory();

    const columns = [{
        dataField: 'name',
        text: 'Здание'
    }, {
        dataField: 'ordinal',
        text: 'Место в очереди строительство'
    }, {
        dataField: 'comment',
        text: 'Комментарий'
    }, {
        dataField: 'status',
        text: 'Статус',
    },];

    const [buildings, setBuildings] = useState([]);
    useEffect(() => {
            getBuildingOrders().then((newBuildings) => setBuildings(newBuildings))
        },
        []
    );

    const firstBuildingId = buildings.length > 0 ? buildings[0].id : "";

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(`${BUILDER_TAKE_ORDER_ROUTE}/${firstBuildingId}`)
                }}>Взять заказ на строительство</Button>
            </div>
            <BootstrapTable keyField='id' data={buildings} columns={columns}/>
        </div>
    );
}
