import {BUILDING_STATUS_IN_CREATED, buildingStatusToReadable, DEBUG} from "../constants";
import {createBuildingOrderRequest, getBuildingOrdersRequest} from "../repository/building_orders";
import {getToken} from "./auth";
import {getBuildingByIdRequest} from "../repository/resources";

export const getBuildingOrders = async () => {
    if (!DEBUG) {
        return [
            {id: 1, name: "Капитолий", ordinal: 1, status: BUILDING_STATUS_IN_CREATED, comment: "123"},
            {id: 2, name: "Капитолий 2", ordinal: 2, status: BUILDING_STATUS_IN_CREATED, comment: "@@@"},
            {id: 3, name: "Капитолий 3", ordinal: 3, status: BUILDING_STATUS_IN_CREATED, comment: "333"},
            {id: 4, name: "Капитолий 4", ordinal: 4, status: BUILDING_STATUS_IN_CREATED, comment: "321"},
        ];
    } else {
        const data = await getBuildingOrdersRequest(getToken());

        for (let i = 0; i < data.length; i++) {
            data[i].name = data[i].assetDef.name;
            data[i].status = buildingStatusToReadable[data[i].status];
        }

        return data
    }
}

export const createBuildingOrder = async (toBeginningQueue, buildingId, comment, historyRouter) => {
    if (!DEBUG) {
        historyRouter.go(-1);
    } else {
        await createBuildingOrderRequest(toBeginningQueue, buildingId, comment, getToken());
        historyRouter.go(-1);
    }

}

export const getBuildingOrderById = async (orderId) => {
    const orders = await getBuildingOrders();


    let order = null;
    for (let i = 0; i < orders.length; i++) {
        console.log(orders[i].id, orderId, orders[i].id === orderId);
        if (orders[i].id === orderId) {
            order = orders[i];
        }
    }

    const building = await getBuildingByIdRequest(order.assetDef.id, getToken());
    return {
        order: order,
        building: building,
    }
}