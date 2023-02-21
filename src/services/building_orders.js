import {
    CREATED_BUILDING_ORDER_STATUS,
    buildingStatusToReadable,
    DEBUG, FINISHED_BUILDING_ORDER_STATUS,
    IN_PROGRESS_BUILDING_ORDER_STATUS, REFUSED_BUILDING_ORDER_STATUS
} from "../constants";
import {
    changeBuildingOrderStateRequest,
    createBuildingOrderRequest, decreaseBuildingOrderPriorityRequest,
    getBuildingOrdersRequest, increaseBuildingOrderPriorityRequest
} from "../repository/building_orders";
import {getToken} from "./auth";
import {getBuildingByIdRequest} from "../repository/assets";
import {getBuildingAssetDefByIdRequest} from "../repository/assetDefs";

export const getBuildingOrders = async () => {
    if (DEBUG) {
        return [
            {id: 1, name: "Капитолий", ordinal: 1, status: CREATED_BUILDING_ORDER_STATUS, comment: "123"},
            {id: 2, name: "Капитолий 2", ordinal: 2, status: CREATED_BUILDING_ORDER_STATUS, comment: "@@@"},
            {id: 3, name: "Капитолий 3", ordinal: 3, status: CREATED_BUILDING_ORDER_STATUS, comment: "333"},
            {id: 4, name: "Капитолий 4", ordinal: 4, status: CREATED_BUILDING_ORDER_STATUS, comment: "321"},
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
    if (DEBUG) {
        // Do nothing in Debug
    } else {
        await createBuildingOrderRequest(toBeginningQueue, buildingId, comment, getToken());
    }

    historyRouter.go(-1);
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

    const building = await getBuildingAssetDefByIdRequest(order.assetDef.id, getToken());
    return {
        order: order,
        building: building,
    }
}

export const increaseBuildingOrderPriority = async (orderId) => {
    if (DEBUG) {
        // do nothing
    } else {
        await increaseBuildingOrderPriorityRequest(orderId, getToken());
    }
}

export const decreaseBuildingOrderPriority = async (orderId) => {
    if (DEBUG) {
        // do nothing
    } else {
        await decreaseBuildingOrderPriorityRequest(orderId, getToken());
    }
}

export const dismissBuildingOrder = async (orderId) => {
    await changeBuildingOrderStateRequest(REFUSED_BUILDING_ORDER_STATUS, orderId, getToken());
}

export const acceptBuildingOrder = async (orderId) => {
    await changeBuildingOrderStateRequest(IN_PROGRESS_BUILDING_ORDER_STATUS, orderId, getToken());
}

export const finishBuildingOrder = async (orderId) => {
    await changeBuildingOrderStateRequest(FINISHED_BUILDING_ORDER_STATUS, orderId, getToken());
}
