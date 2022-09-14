import axios from "axios";
import {AUDIT} from "./api_paths";

export const createAuditRequest = async (startDate, endDate, resourceTypes, token) => {
    try {
        const response = await axios.post(AUDIT, {
                startDate: "2022-09-14T04:27:07",
                endDate: "2022-09-14T04:55:47"
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