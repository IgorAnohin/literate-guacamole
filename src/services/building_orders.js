import {BUILDING_STATUS_IN_CREATED, buildingStatusToReadable, DEBUG} from "../constants";
import {createBuildingOrderRequest, getBuildingOrdersRequest} from "../repository/building_orders";
import {getToken} from "./auth";

export const getBuildingOrders = async () => {
    if (!DEBUG) {
        return [
            {id: 1, name: "Капитолий", ordinal: 1, status: BUILDING_STATUS_IN_CREATED},
            {id: 2, name: "Капитолий 2", ordinal: 2, status: BUILDING_STATUS_IN_CREATED},
            {id: 3, name: "Капитолий 3", ordinal: 3, status: BUILDING_STATUS_IN_CREATED},
            {id: 4, name: "Капитолий 4", ordinal: 4, status: BUILDING_STATUS_IN_CREATED},
        ];
    } else {
        const data = await getBuildingOrdersRequest(getToken());

        for (let i = 0; i < data.length; i++) {
            data[i].name = data[i].assetDef.code;
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

export const getClosestBuildingOrder = async () => {

}