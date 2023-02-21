import axios from 'axios';
import {ASSET_DEFS, USERS} from "./api_paths";
import {BUILDING_ASSET, RECRUIT_ASSET, SPELL_ASSET} from "../constants";

export const getAssetDefsRequest = async (token) => {
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

export const getSpellAssetDefsRequest = async (token) => {
    return (await getAssetDefsRequest(token))
        .filter((assetDef) => assetDef.type === SPELL_ASSET)
}

export const getBuildingAssetDefsRequest = async (token) => {
    return (await getAssetDefsRequest(token))
        .filter((assetDef) => assetDef.type === BUILDING_ASSET)
}

export const getRecruitAssetDefsRequest = async (token) => {
    return (await getAssetDefsRequest(token))
        .filter((assetDef) => assetDef.type === RECRUIT_ASSET)
}

export const getAssetDefRequest = async (assetDefId, token) => {
    try {
        const response = await axios.get(`${ASSET_DEFS}/${assetDefId}`, {
                headers: {
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

export const createAssetDefRequest = async (name, type, description, imageUrl, costs, level, magic_school, fraction, token) => {
    try {
        const data = {
            'type': type,
            'code': type + '-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
            'name': name,
            'description': description,
            'imgOrigUrl': imageUrl,
            'cost': costs,
            'fraction': fraction, // or null
            'magicSchool': magic_school, // or null
            'level': level, // or null
        }
        const response = await axios.post(ASSET_DEFS, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data.id;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const updateAssetDefRequest = async (assetDefId, name, type, description, imageUrl, costs, level, magic_school, fraction, token) => {
    try {
        const data = {
            'type': type,
            'name': name,
            'description': description,
            'imgOrigUrl': imageUrl,
            'cost': costs,
            'fraction': fraction, // or null
            'magicSchool': magic_school, // or null
            'level': level, // or null
        }
        const response = await axios.patch(`${ASSET_DEFS}/${assetDefId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data.id;
    } catch (err) {
        console.log(err);
        return [];
    }
}


export const getBuildingAssetDefByIdRequest = async (buildingId, token) => {
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
