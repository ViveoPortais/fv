import { IForgetPasswordData, ILoginData, IResendToken } from "@/types";
import api from "./api";

const programCode = `${process.env.PROGRAM_CODE}`;

export const login = async (data: ILoginData) => {
  const res = await api.post("/logintwosteps", {
    ...data,
    healthProgramCode: programCode,
  });
  return res.data;
};

export const forgetPassword = async (data: IForgetPasswordData) => {
  const res = await api.post("/forgotpassword/doctor", {
    ...data,
    ProgramCode: programCode,
  });
  return res.data;
};

export const resendToken = async (data: IResendToken) => {
  const res = await api.post("/resendtoken", {
    ...data,
    healthProgramCode: programCode,
  });
  return res.data;
}
