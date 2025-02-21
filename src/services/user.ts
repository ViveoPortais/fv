import { IUpdateRepresentativeInfo } from "@/types/professions";
import api from "./api";
import { IDoctorData, IUpdateDoctorData } from "@/types";
import { IChangePassword } from "@/types/user";

const programCode = `${process.env.PROGRAM_CODE}`;

export const getUserInfo = async (programCode: string) => {
  const res = await api.get("/user/getuserdata", {
    params: {
      programCode: programCode,
    },
  });
  return res.data;
};

export const updateDoctorInfo = async (data: IUpdateDoctorData) => {
  const res = await api.put("/doctor/updatedoctor", data);
  return res.data;
};

export const updateRepresentativeInfo = async (data: IUpdateRepresentativeInfo) => {

  const res = await api.put("/healthProfessional/updatehealthprofessional", data);
  return res.data;
};

export const changePassword = async (data: IChangePassword) => {
  const res = await api.post("/user/changepassword", {
    ...data,
    programCode: programCode
  });
  return res.data;
}