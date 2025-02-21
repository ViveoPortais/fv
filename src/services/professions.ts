import { IProfessionalData } from "@/types/professions";
import api from "./api";
import { IStringMap, IStringMapData } from "@/types";

const programCode = `${process.env.PROGRAM_CODE}`;

export const getListProfessions = async (data: IStringMapData) => {
  const response = await api.get("/StringMap/getbasicstringmaplist", {
    params: {
      entityName: data.entityName,
      attributeName: data.attributeName,
      programCode: data.programCode
    }
  })

  return response.data
}

export const getOptionsProfessions = async (): Promise<IStringMap[]> => {
  const optionsProfessions = await getListProfessions({
    entityName: "HealthProfessionalByProgram",
    attributeName: "ProfessionalTypeStringMap",
    programCode: `${process.env.PROGRAM_CODE}`
  });

  return (
    optionsProfessions.filter((item: IStringMap) => item !== null).sort((a: IStringMap, b: IStringMap) => {
      return a.optionName.localeCompare(b.optionName);
    })
  );
};

export const addProfessional = async (data: IProfessionalData) => {
  const res = await api.post("/healthProfessional/addhealthprofessional", {
    ...data,
    programCode: programCode
  });
  return res.data;
}

export const linkDoctor = async (doctorId: string, programCode: string) => {
  const res = await api.post(`/healthProfessional/healthprofessionalbond`, {
    doctorId: doctorId,
    programCode: programCode
  });

  return res.data;
}

export const getNurses = async ( programCode: string, doctorId?: string) => {
  const res = await api.get(`/healthProfessional/healthProfessionalByProgramDoctorByProgram`, {
    params: {
      programCode: programCode,
      ...(doctorId && { doctorId: doctorId })
    }
  });

  return res.data;
}

export const searchProfessional = async (professionalTypeStringMapId: string, licenseState: string, licenseNumber: string) => {
  const res = await api.get(`/healthProfessional`, {
    params: {
      professionalTypeStringMapId: professionalTypeStringMapId,
      licenseNumber: licenseNumber,
      licenseState: licenseState,
      programCode: programCode
    }
  });

  return res.data;
}

export const linkProfessional = async (representativeId: string) => {
  const res = await api.post(`/healthProfessional/healthprofessionalbond`, {
    healthProfessionalByProgramId: representativeId,
    programCode: programCode
  });

  return res.data;
}
