import {getBuildingsRequest, getResourcesRequest} from "../repository/assets";
import {getToken} from "./auth";
import {BUILDER_ROLE, BUILDING_ASSET, DEBUG, RECRUIT_ASSET, RESOURCE_ASSET, STONE_RESOURCE} from "../constants";
import {createAssetDefRequest, getAssetDefRequest, getAssetDefsRequest} from "../repository/assetDefs";
import {createUserRequest, getUserRequest, uploadAvatarRequest} from "../repository/user";


const MOCK_ASSET_DEF_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsn55rXnt0jZLwjkk8CotD0LG0IEZgil3S4gXx15Q-Q&s";


export const getAssetDefs = async () => {
    let data;

    if (DEBUG) {
        data = {
            assetDefs: [
                {id: 1, name: "Капитолий", type: BUILDING_ASSET, cost: [{id: 2, count: 100}, {id: 3, count: 200}]},
                {id: 2, name: "Песок", type: RESOURCE_ASSET, cost: []},
                {id: 3, name: "золото", type: RESOURCE_ASSET, cost: []},
            ]
        };
    } else {
        data = await getAssetDefsRequest(getToken());
    }

    return data.assetDefs;
}


export const getAssetDef = async (assetDefId) => {
    let data
    if (DEBUG) {
        data = {
            id: 1,
            name: "Капитолий",
            description: "Test description",
            image: MOCK_ASSET_DEF_URL,
            type: BUILDING_ASSET,
            cost: [{name: STONE_RESOURCE.toLowerCase(), count: 10}, {name: "gold", count: 200}]
        };
    } else {
        data = await getAssetDefRequest(assetDefId, getToken());
    }

    return data;
}


export const createAssetDef = async (name, type, description, costs, image, router) => {
    let imageUrl;
    if (DEBUG) {
        imageUrl = MOCK_ASSET_DEF_URL;
    } else {
        imageUrl = await uploadAvatarRequest(image, getToken());
    }

    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await createAssetDefRequest(name, type, description, imageUrl, costs, getToken());
    }

    const newAsetDefId = data;

    if (newAsetDefId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newAsetDefId;
}


export const updateAssetDef = async (assetDefId, name, type, description, costs, image, router) => {
    let imageUrl;
    if (DEBUG) {
        imageUrl = MOCK_ASSET_DEF_URL;
    } else {
        imageUrl = await uploadAvatarRequest(image, getToken());
    }

    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await createAssetDefRequest(assetDefId, name, type, description, imageUrl, costs, getToken());
    }

    const newAsetDefId = data;

    if (newAsetDefId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newAsetDefId;
}


export const getResourcesAssetDefs = async () => {
    let data;

    if (DEBUG) {
        data = {
            assetDefs: [
                {id: 2, name: "Песок", type: RESOURCE_ASSET},
                {id: 3, name: "золото", type: RESOURCE_ASSET},
            ]
        };
    } else {
        data = await getAssetDefsRequest(getToken());
    }

    return data.assetDefs;
}
