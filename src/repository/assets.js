import {ASSET_DEFS, ASSETS, BASE_URL, BUILD_ORDERS} from "./api_paths";
import axios from 'axios';
import {RECRUIT_ASSET, RESOURCE_ASSET, SPELL_ASSET} from "../constants";

const getAssetsRequest = async (token) => {
    try {
        const response = await axios.get(ASSETS, {
                headers: {'Authorization': `Bearer ${token}`}
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getResourcesRequest = async (token) => {
    return (await getAssetsRequest(token))
        .filter((asset) => { return asset.assetDef.type == RESOURCE_ASSET })
}

export const getRecruitsRequest = async (token) => {
    return (await getAssetsRequest(token))
        .filter((asset) => { return asset.assetDef.type == RECRUIT_ASSET })
}

export const getSpellsRequest = async (token) => {
    return (await getAssetsRequest(token))
        .filter((asset) => { return asset.assetDef.type == SPELL_ASSET })
}

export const changeAssetAmountRequest = async (assetId, newAmount, token) => {
    try {
        const data = {'quantity': newAmount}
        await axios.patch(`${ASSETS}/${assetId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
    } catch (err) {
        console.log(err);
    }
}

export const removeAssetRequest = async (assetId, token) => {
    try {
        await axios.delete(`${ASSETS}/${assetId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            },
        );
    } catch (err) {
        console.log(err);
    }
}

export const createAssetRequest = async (assetDefId, token) => {
    try {
        const data = {
            'assetDefId': assetDefId,
            'quantity': 0,
        }
        const response = await axios.post(ASSETS, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        );
        return response.data.id;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getBuildingsRequest = async (token) => {
    try {
        const response = await axios.get(ASSET_DEFS, {
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
        console.log(`Request ${ASSET_DEFS}/${buildingId}, token ${token}`);
        const response = await axios.get(`${ASSET_DEFS}/${buildingId}`, {
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
