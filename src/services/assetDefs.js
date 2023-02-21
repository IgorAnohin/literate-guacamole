import {getBuildingsRequest, getResourcesRequest} from "../repository/assets";
import {getToken} from "./auth";
import {
    BUILDER_ROLE,
    BUILDING_ASSET,
    DEBUG, GEM_RESOURCE,
    GOLD_RESOURCE,
    RECRUIT_ASSET,
    RESOURCE_ASSET, SPELL_ASSET,
    STONE_RESOURCE
} from "../constants";
import {
    createAssetDefRequest,
    getAssetDefRequest,
    getAssetDefsRequest, getBuildingAssetDefsRequest, getRecruitAssetDefsRequest, getSpellAssetDefsRequest,
    updateAssetDefRequest
} from "../repository/assetDefs";
import {uploadAvatarRequest} from "../repository/files";


export const DEFAULT_ASSET_DEF_URL = "https://cdn-icons-png.flaticon.com/512/1728/1728869.png";


export const getAssetDefs = async () => {
    let data;

    if (DEBUG) {
        data = [
            // {id: 1, name: "Капитолий", type: BUILDING_ASSET, cost: [{name: GOLD_RESOURCE, count: 100}, {name: GEM_RESOURCE, count: 200}]},
            {id: 1, name: "Капитолий", type: BUILDING_ASSET, cost: [{id: 2, count: 100}, {id: 3, count: 200}]},
            {id: 2, name: "Песок", type: RESOURCE_ASSET, cost: []},
            {id: 3, name: "золото", type: RESOURCE_ASSET, cost: []},
        ];
    } else {
        data = await getAssetDefsRequest(getToken());
    }

    return data;
}

export const getAssetDef = async (assetDefId) => {
    let data
    if (DEBUG) {
        data = {
            id: 1,
            name: "Капитолий",
            description: "Test description",
            imgOrigUrl: DEFAULT_ASSET_DEF_URL,
            type: BUILDING_ASSET,
            cost: [{name: STONE_RESOURCE.toLowerCase(), count: 10}, {name: GOLD_RESOURCE.toLowerCase(), count: 200}],
            //cost: [{name: STONE_RESOURCE.toLowerCase(), count: 10}, {name: "gold", count: 200}],
        };
    } else {
        data = await getAssetDefRequest(assetDefId, getToken());
        console.log(data);
    }

    return data;
}

export const createAssetDef = async (name, type, description, costs, level, magic_school, fraction, image, router) => {
    let imageUrl = DEFAULT_ASSET_DEF_URL;
    if (image != undefined) {
        if (DEBUG) {
            imageUrl = DEFAULT_ASSET_DEF_URL;
        } else {
            imageUrl = await uploadAvatarRequest(image, getToken());
        }
    }

    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await createAssetDefRequest(name, type, description, imageUrl, costs, level, magic_school, fraction, getToken());
    }

    const newAsetDefId = data;

    if (newAsetDefId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newAsetDefId;
}

export const updateAssetDef = async (assetDefId, name, type, description, costs, level, magic_school, fraction, image, origImageUrl, router) => {
    let imageUrl = origImageUrl;

    console.log("New image:", image);
    if (image != undefined) {
        if (DEBUG) {
            imageUrl = DEFAULT_ASSET_DEF_URL;
        } else {
            imageUrl = await uploadAvatarRequest(image, getToken());
        }
    }

    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await updateAssetDefRequest(assetDefId, name, type, description, imageUrl, costs, level, magic_school, fraction, getToken());
    }

    const newAsetDefId = data;

    if (newAsetDefId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newAsetDefId;
}

export const getRecruitAssetDefs = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Крестьянин", fraction: "Орден Порядка", level: "1", image: DEFAULT_ASSET_DEF_URL},
            {id: 2, name: "Михаил", fraction: "Лесной Союз", level: "2", image: DEFAULT_ASSET_DEF_URL},
            {
                id: 3,
                name: "Гремлин-вредитель",
                fraction: "Академия волшебства",
                level: "3",
                image: DEFAULT_ASSET_DEF_URL
            },
        ];
    } else {
        data = await getRecruitAssetDefsRequest(getToken());
    }

    return data;
}

export const getSpellAssetDefs = async () => {
    let data;

    if (DEBUG) {
        data = [
            {id: 1, name: "Волшебная стрела", magicSchool: "Огонь", level: "1", image: DEFAULT_ASSET_DEF_URL},
            {id: 2, name: "Землетрясение", magicSchool: "Земля", level: "1", image: DEFAULT_ASSET_DEF_URL},
            {id: 3, name: "Цепная молния", magicSchool: "Воздух", level: "1", image: DEFAULT_ASSET_DEF_URL},
        ];
    } else {
        data = await getSpellAssetDefsRequest(getToken());
        console.log("Spells:", data);
    }

    return data;
}

export const getBuildingAssetDefs = async () => {
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
        data = await getBuildingAssetDefsRequest(getToken());
    }

    return data;
}
