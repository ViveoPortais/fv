import { api } from "./api";

export const getListOptions = async (programCode: string) => {
  const response = await api.get("/exam/options", {
    params: {
      programcode: programCode
    },
  });
  return response.data;
};

export const downloadLaudo = async (id: string, programCode: string) => {
  const response = await api.get("/exam/voucherattachment", {
    params: {
      programcode: programCode,
      examid: id
    },
    responseType: "blob",
    headers: {}
  });
  return response;
}