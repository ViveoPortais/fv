import api from "./api";

export const sendDocuments = async (data: any) => {
  const response = await api.post("/Patient/upload/files", data);

  return response.data;
};
