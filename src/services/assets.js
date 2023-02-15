import {
    changeAssetAmountRequest, createAssetRequest,
    getBuildingsRequest,
    getRecruitsRequest,
    getResourcesRequest, getSpellsRequest, removeAssetRequest
} from "../repository/assets";
import {getToken} from "./auth";
import {BUILDING_ASSET, DEBUG} from "../constants";

const MOCK_ASSET_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsn55rXnt0jZLwjkk8CotD0LG0IEZgil3S4gXx15Q-Q&s";

export const getAssets = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Песок", amount: "12", type: "Ресурс"},
            {id: 2, name: "Капитолий", amount: "11", type: "Здание"},
            {id: 3, name: "Жмых", amount: "1", type: "Рекрутёр"},
        ];
    } else {
        data = await getResourcesRequest(getToken());
    }

    return data;
}

export const changeAssetAmount = async (assetId, newAmount) => {
    if (DEBUG) {
        // Do nothing in debug
    } else {
        await changeAssetAmountRequest(assetId, newAmount, getToken());
    }

    return true;
}

export const removeAsset = async (assetId) => {
    if (DEBUG) {
        // Do nothing in debug
    } else {
        await removeAssetRequest(assetId, getToken());
    }

    return true;
}

export const getResources = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Песок", quantity: "12", image: MOCK_ASSET_URL},
            {id: 2, name: "Капитолий", quantity: "11", image: MOCK_ASSET_URL},
            {id: 3, name: "Жмых", quantity: "1", image: MOCK_ASSET_URL},
        ];
    } else {
        const rawData = await getResourcesRequest(getToken());
        data = [];
        for (const resource of rawData) {
            data.push({
                id: resource.id,
                quantity: resource.quantity,
                name: resource.assetDef.name,
                image: resource.assetDef.imgOrigUrl,
            })

        }
        console.log(data);
    }

    return data;
}

export const createAsset = async (assetDefId) => {
    let data;

    if (DEBUG) {
    } else {
        data = await createAssetRequest(assetDefId, getToken());
    }
}

export const getRecruits = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Крестьянин", fraction: "Орден Порядка", level: "1", quantity: "12", image: MOCK_ASSET_URL},
            {id: 2, name: "Михаил", fraction: "Лесной Союз", level: "2", quantity: "11", image: MOCK_ASSET_URL},
            {
                id: 3,
                name: "Гремлин-вредитель",
                fraction: "Академия волшебства",
                level: "3",
                quantity: "1",
                image: MOCK_ASSET_URL
            },
        ];
    } else {
        const rawData = await getRecruitsRequest(getToken());
        data = [];
        for (const resource of rawData) {
            data.push({
                id: resource.id,
                quantity: resource.quantity,
                name: resource.assetDef.name,
                image: resource.assetDef.imgOrigUrl,
            })

        }
    }

    return data;
}

export const getSpells = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Волшебная стрела", magicSchool: "Огонь", level: "1", image: MOCK_ASSET_URL},
            {id: 2, name: "Землетрясение", magicSchool: "Земля", level: "1", image: MOCK_ASSET_URL},
            {id: 3, name: "Цепная молния", magicSchool: "Воздух", level: "1", image: MOCK_ASSET_URL},
        ];
    } else {
        const rawData = await getSpellsRequest(getToken());
        data = [];
        for (const resource of rawData) {
            data.push({
                id: resource.id,
                name: resource.assetDef.name,
                image: resource.assetDef.imgOrigUrl,
                magicSchool: resource.assetDef.imgOrigUrl,
                level: resource.assetDef.level,
            })

        }
        console.log("Raw data:", rawData);
        console.log("Parsed data:", data);
    }

    return data;
}

export const getBuildings = async () => {
    let data;

    if (DEBUG) {
        data = [
            {
                code: "kapitoly",
                description: "Капитолий Капитолий",
                id: 1,
                img75Url: null,
                img130Url: null,
                img250Url: null,
                imgOrigUrl: null,
                name: "Капитолий",
                type: BUILDING_ASSET,
            },
            {
                code: "kapitoly",
                description: "Капитолий Капитолий",
                id: 22,
                img75Url: null,
                img130Url: null,
                img250Url: null,
                imgOrigUrl: null,
                name: "Замок",
                type: BUILDING_ASSET,
            },
        ];
    } else {
        data = await getBuildingsRequest(getToken());
    }

    return data.filter((element) => element.type == BUILDING_ASSET)
}