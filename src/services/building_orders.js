import {BUILDING_STATUS_IN_CREATED, DEBUG} from "../constants";
import {createBuildingOrderRequest, getBuildingOrdersRequest} from "../repository/building_orders";
import {getToken} from "./auth";

export const getBuildingOrders = async () => {
    if (DEBUG) {
        return [
            {id: 1, name: "Капитолий", place: 1, status: BUILDING_STATUS_IN_CREATED},
            {id: 2, name: "Капитолий 2", place: 2, status: BUILDING_STATUS_IN_CREATED},
            {id: 3, name: "Капитолий 3", place: 3, status: BUILDING_STATUS_IN_CREATED},
            {id: 4, name: "Капитолий 4", place: 4, status: BUILDING_STATUS_IN_CREATED},
        ];
    }

    return await getBuildingOrdersRequest(getToken());
}

export const createBuildingOrder = async (toBeginningQueue, buildingId, comment, historyRouter) => {
    if (DEBUG) {

    } else {
        const data = await createBuildingOrderRequest(toBeginningQueue, buildingId, comment, getToken());
    }

    historyRouter.go(-1);
}