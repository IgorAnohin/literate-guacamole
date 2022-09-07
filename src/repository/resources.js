import {ASSETS, BASE_URL, BUILD_ORDERS} from "./api_paths";
import axios from 'axios';


export const getResourcesRequest = async (token) => {

}

export const getBuildingsRequest = async (token) => {
    try {
        const response = await axios.get(ASSETS, {
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

export const getBuildingByIdRequest = async (buildingId, token) => {

}

export const createNewBuildingRequest = async () => {

}
