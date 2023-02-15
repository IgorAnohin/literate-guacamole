import axios from 'axios';
import {ASSET_DEFS, USERS} from "./api_paths";

export const getAssetDefsRequest = async (token) => {
    try {
        console.log(`Request ${ASSET_DEFS}, token ${token}`);
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

export const createAssetDefRequest = async (name, type, description, imageUrl, costs, token) => {
    try {
        const data = {
            'type': type,
            'code': type + '-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
            'name': name,
            'description': description,
            'imgOrigUrl': imageUrl,
            'cost': costs,
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

export const updateAssetDefRequest = async (assetDefId, name, type, description, imageUrl, costs, token) => {
    try {
        const data = {
            'type': type,
            'name': name,
            'description': description,
            'imgOrigUrl': imageUrl,
            'cost': costs,
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


