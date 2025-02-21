import { api } from "./api";

const programCode = "150";

export interface IDisease {
  id: string;
  name: string;
}

export const getDiseases = async () => {
  const response = await api.get("/Disease/getdiseases", {
    params: {
      programcode: programCode,
    },
  });
  return response.data;
};

export const getMedications = async (diseaseId: string) => {
  const response = await api.get("/Disease/getmedications", {
    params: {
      diseaseId: diseaseId,
      programcode: programCode,
    },
  });
  return response.data;
};
