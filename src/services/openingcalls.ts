import { IPostIncident, IStringMap, IStringMapData } from "@/types";
import api from "./api";

export const getOptionsOpeningCalls = async (data: IStringMapData) => {
    const response = await api.get("/StringMap/getbasicstringmaplist", {
        params: {
            entityName: data.entityName,
            attributeName: data.attributeName,
            programCode: data.programCode
        }
    })

    return response.data
};

export const postIncident = async (data: IPostIncident) => {
    const response = await api.post("/Incident/postIncident", data);

    return response.data;
};