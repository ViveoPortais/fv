import api from "./api";
import {PowerBIDashboardRequestModel} from "../types/powerbi"

export const getDashboard = async (data : PowerBIDashboardRequestModel) => {
    const response = await api.get("powerbi/report", {
      params: {
        reportId: data.reportId,
        groupId: data.groupId,
      }
    })
    return response.data;
};

