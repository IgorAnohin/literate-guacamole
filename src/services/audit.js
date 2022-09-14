import {getToken} from "./auth";
import {createAuditRequest} from "../repository/audit";
import {DEBUG} from "../constants";

export const createAudit = async (startDateTime, endDateTime, resourcesList) => {
    if (!DEBUG) {
        return "assetDefCode,assetDefId,assetDefName,assetDefType,auditDate,code,creationDate,description,id,name,quantity,revision\n" +
            "tavern,2,Таверна,BUILDING,2022-09-14T03:55:44,,\"2022-09-14T03:55:44.402959\",,1,,1,57\n" +
            "tavern,2,Таверна,BUILDING,2022-09-14T04:25:53,,\"2022-09-14T04:25:53.534239\",,3,,1,102\n" +
            "tavern,2,Таверна,BUILDING,2022-09-14T04:27:07,,\"2022-09-14T04:27:07.64702\",,5,,1,152\n" +
            "village-hall,3,\"Сельская управа\",BUILDING,2022-09-14T03:55:44,,\"2022-09-14T03:55:44.415734\",,2,,1,58\n" +
            "village-hall,3,\"Сельская управа\",BUILDING,2022-09-14T04:25:53,,\"2022-09-14T04:25:53.572288\",,4,,1,103\n" +
            "village-hall,3,\"Сельская управа\",BUILDING,2022-09-14T04:27:07,,\"2022-09-14T04:27:07.693232\",,6,,1,153\n";
    } else {
        return await createAuditRequest(startDateTime, endDateTime, resourcesList, getToken());
    }
}