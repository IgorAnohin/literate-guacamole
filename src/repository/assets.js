import {ASSETS, BASE_URL, BUILD_ORDERS} from "./api_paths";
import axios from 'axios';


export const getResourcesRequest = async (token) => {

}

export const getRecruitsRequest = async (token) => {

}

export const getSpellsRequest = async (token) => {

}

export const changeAssetAmountRequest = async (assetId, newAmount, token) => {

}

export const removeAssetRequest = async (assetId, token) => {

}

export const createAssetRequest = async (assetId, token) => {

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
    try {
        console.log(`Request ${ASSETS}/${buildingId}, token ${token}`);
        const response = await axios.get(`${ASSETS}/${buildingId}`, {
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

export const createNewBuildingRequest = async () => {

}
