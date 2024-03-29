import {
    ASSET_DEFS,
    BUILD_ORDERS,
    BUILD_ORDERS_CHANGE_STATUS,
    BUILD_ORDERS_CREATE, BUILD_ORDERS_DECREASE_PRIORITY,
    BUILD_ORDERS_INCREASE_PRIORITY,
    LOGIN_URL
} from "./api_paths";
import axios from "axios";
import {getToken} from "../services/auth";

export const getBuildingOrdersRequest = async (token) => {
    try {
        const response = await axios.get(BUILD_ORDERS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const createBuildingOrderRequest = async (toBeginningQueue, buildingId, comment, token) => {
    try {
        const response = await axios.post(BUILD_ORDERS_CREATE, {
                "assetDefId": buildingId,
                "comment": comment,
                "pushFront": toBeginningQueue,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const changeBuildingOrderStateRequest = async (newStatus, orderId, token) => {
    try {
        const response = await axios.post(BUILD_ORDERS_CHANGE_STATUS(orderId), {
                status: newStatus,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const increaseBuildingOrderPriorityRequest = async (orderId, token) => {
    try {
        const response = await axios.post(BUILD_ORDERS_INCREASE_PRIORITY(orderId), null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const decreaseBuildingOrderPriorityRequest = async (orderId, token) => {
    try {
        const response = await axios.post(BUILD_ORDERS_DECREASE_PRIORITY(orderId), null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
