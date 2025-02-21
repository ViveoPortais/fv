import { TreatmentData } from "@/types";
import { api } from "./api";

const programCode = "150";

export const addTreatment = async (data: TreatmentData) => {
  const response = await api.post("/Treatment/add", {
    ...data,
    programCode,
  });
  return response.data;
};

export const getTreatments = async (filters: any) => {
  const response = await api.get("/Treatment/gettreatments", {
    params: {
      programcode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getAllTreamentsNurse = async (filters: any) => {
  const response = await api.get("/Treatment/gettreatmentsbyrepresentative", {
    params: {
      programcode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getTreatmentByServiceType = async (filter?: any) => {
  const response = await api.get("/Treatment/gettreatmentsbyservicetype", {
    params: {
      programcode: programCode,
      ...filter,
    },
  });
  return response.data.data as any[];
};

export const getTreatmentExam = async () => {
  const response = await api.get("/Treatment/getexamsbytreatment", {
    params: {
      programcode: programCode,
      pageSize: 1000000,
    },
  });
  return response.data.data;
};

export const getTreatmentInfusions = async (filters?: any) => {
  const response = await api.get("/Treatment/getinfusionsbytreatment", {
    params: {
      // ...filters,
      programcode: programCode,
      pageSize: 1000000,
    },
  });
  return response.data.data;
};
export const getInfusionsByTreatmentPatient = async (filters: any) => {
  const response = await api.get("/Treatment/getinfusionsbytreatmentpatient", {
    params: {
      ...filters,
      programcode: programCode,
    },
  });
  return response.data.data;
};

export const getExamsByTreatmentPatient = async (filters: any) => {
  const response = await api.get("/Treatment/getexamsbytreatmentpatient", {
    params: {
      ...filters,
      programcode: programCode,
    },
  });
  return response.data.data;
};

export const sendSMSVoucher = async (data: any, isExam: boolean) => {
  const response = await api.post("/Treatment/sendsmstreatment", null, {
    params: {
      treatmentId: data.treatmentId,
      mobilephone: data.mobilephone,
      voucher: data.voucher,
      templatename: isExam ? "#VOUCHER_EXAM_CDA_TRE" : "#VOUCHER_INF_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const requestHomeInfusion = async (data: any) => {
  let payloadData = {
    treatmentId: data.treatmentId,
    healthProgramCode: programCode,
    medicalPrescriptionAttach: data.medicalPrescriptionAttach,
    medicalReportAttach: data.medicalReportAttach,
  };

  const response = await api.post(
    "/Treatment/requesthomeinfusion",
    payloadData
  );
  return response.data;
};

export const sendEmailVoucher = async (data: any, isExam: boolean) => {
  const response = await api.post("/Treatment/sendemailtreatment", null, {
    params: {
      treatmentId: data.treatmentId,
      emailaddress: data.emailaddress,
      voucher: data.voucher,
      templatename: isExam ? "#VOUCHER_EXAM_CDA_TRE" : "#VOUCHER_INF_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const requestExamPatient = async (examId: string) => {
  const response = await api.post("/Treatment/requestexampatient", null, {
    params: {
      examId,
      programcode: programCode,
    },
  });
  return response.data;
};

export const requestInfusionPatient = async (
  infusionId: string,
  sameclinic: boolean | null
) => {
  const response = await api.post("/Treatment/requestinfusionpatient", null, {
    params: {
      infusionId,
      sameclinic: sameclinic,
      programcode: programCode,
    },
  });
  return response.data;
};

export const reativatePatient = async (data: any) => {
  const response = await api.post("/Treatment/reativatepatient", {
    ...data,
    cpfCaregiver: data.cpfCaregiver || null,
    nameCaregiver: data.nameCaregiver || null,
    birthdateCaregiver: data.birthdateCaregiver || null,
  });

  return response.data;
};

export const getTreatmentByCpf = async (cpf: string) => {
  const response = await api.get("/Treatment/gettreatmentbycpf", {
    params: {
      cpf: cpf,
    },
  });

  return response.data;
};

export const getDiseaseMessage = async (id: string) => {
  const response = await api.get("/Treatment/getdiseasemessage", {
    params: {
      treatmentId: id,
      healthProgramCode: programCode,
    },
  });

  return response.data;
};

export const verifyAllowEsexams = async (id: string) => {
  const response = await api.get("/Treatment/verifyallowesexams", {
    params: {
      treatmentId: id,
      programCode: programCode,
    },
  });

  return response.data;
};

export const requestVisit = async (postData: any) => {
  const response = await api.post("/Treatment/schedulevisit", {
    ...postData,
    programCode: programCode,
  });

  return response.data;
};

export const listVisits = async (filters?: any) => {
  const response = await api.get("Treatment/listvisit", {
    params: {
      ...filters,
      programCode: programCode,
    },
  });

  return response.data;
};

export const getTreatmentsAdmin = async (filters?: any) => {
  const response = await api.get("Treatment/gettreatmentsadmin", {
    params: {
      ...filters,
      programCode: programCode,
    },
  });

  return response.data.data;
};

export const schedulePsychologicalSupportDoctor = async (
  filters?: any,
  medicalPrescriptionAttach?: any
) => {
  const response = await api.post("/Treatment/schedulepsychologicalsupdoc", {
    ...filters,
    medicalPrescriptionAttach: {
      ...medicalPrescriptionAttach,
    },
    programCode: programCode,
  });

  return response.data;
};
