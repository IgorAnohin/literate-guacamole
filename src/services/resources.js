import {getResourcesRequest} from "../repository/resources";
import {getToken} from "./auth";
import {DEBUG} from "../constants";

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