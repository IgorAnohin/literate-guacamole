import {getToken} from "./auth";
import {createAuditRequest} from "../repository/audit";

export const createAudit = async (startDateTime, endDateTime, resourcesList) => {
    await createAuditRequest(startDateTime, endDateTime, resourcesList, getToken());
}