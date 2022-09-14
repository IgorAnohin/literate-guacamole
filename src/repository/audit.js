import axios from "axios";
import {AUDIT} from "./api_paths";

export const createAuditRequest = async (startDate, endDate, resourceTypes, token) => {
    try {
        const response = await axios.post(AUDIT, {
                startDate: startDate,
                endDate: endDate,
                assetDefTypes: resourceTypes,
            }, {
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