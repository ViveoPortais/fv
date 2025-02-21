import { IDoctorData, IDoctorInfoByCRM, IUpdateDoctorData } from "@/types";
import { api } from "./api";

const programCode = "150";

export const getAllFromProgram = async () => {
  const res = await api.get("/survey/getAllFromProgram", {
    params: {
      programcode: programCode,
    },
  });
  return res.data;
};

export const addPatient = async (data: any) => {
  const response = await api.post("/Patient/addpatient", data);

  return response.data;
};
