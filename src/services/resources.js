import {getBuildingsRequest, getResourcesRequest} from "../repository/resources";
import {getToken} from "./auth";
import {ASSET_BUILDING, ASSET_BUILDING_EN, DEBUG} from "../constants";

export const getResources = async () => {
    let data;

    if (DEBUG) {
        data = {
            resources: [
                {id: 1, name: "Песок", amount: "12", type: "Ресурс"},
                {id: 2, name: "Капитолий", amount: "11", type: "Здание"},
                {id: 3, name: "Жмых", amount: "1", type: "Рекрутёр"},
            ]
        };
    } else {
        data = await getResourcesRequest(getToken());
    }

    return data.resources;
}

export const getBuildings = async () => {
    let data;

    if (!DEBUG) {
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
                type: ASSET_BUILDING_EN,
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
                type: ASSET_BUILDING_EN,
            },
        ];
    } else {
        data = await getBuildingsRequest(getToken());
    }

    return data.filter((element) => element.type == ASSET_BUILDING_EN)
}