import {
    BUILDER_TAKE_ORDER_ROUTE, buildingStatusToReadable,
    CREATED_BUILDING_ORDER_STATUS,
    HOME_ROUTE, IN_PROGRESS_BUILDING_ORDER_STATUS,
    OWNER_NEW_BUILDING_ORDER_ROUTE
} from "../../constants";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {dismissBuildingOrder, finishBuildingOrder, getBuildingOrders} from "../../services/building_orders";

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

    const [buildingOrders, setBuildings] = useState([]);
    useEffect(() => {
            getBuildingOrders().then(setBuildings)
        },
        []
    );

    const firstBuildingOrderId = buildingOrders.length > 0 ? buildingOrders[0].id : "";

    const inProgressBuildingOrderId = buildingOrders.find((order) => buildingStatusToReadable[IN_PROGRESS_BUILDING_ORDER_STATUS] == order.status);

    return (
        <div>
            <div className="d-grid gap-2">
                {inProgressBuildingOrderId == undefined &&
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(`${BUILDER_TAKE_ORDER_ROUTE}/${firstBuildingOrderId}`)
                }}>Взять заказ на строительство</Button>}
                {inProgressBuildingOrderId != undefined &&
                <Button variant="primary" size="lg" onClick={event => {
                    finishBuildingOrder(inProgressBuildingOrderId.id).then(() => {
                        window.location.reload(false);
                    });
                }}>
                    Сдать заказ на строительство
                </Button>}
            </div>
            <BootstrapTable keyField='id' data={buildingOrders} columns={columns}/>
        </div>
    );
}
