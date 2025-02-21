import { api } from "./api";

const programCode = "150";

export const addVoucher = async (
  isExam?: boolean,
  examDefinitionId?: string,
  diagnosticId?: string,
  medicalRequest?: any
) => {
  const response = await api.post("/Voucher/add", {
    programcode: programCode,
    voucherConfigurationCode: isExam ? "#VOUCHEREXAMCDA" : "#VOUCHERINFCDA",
    examOrInfusion: isExam ? true : false,
    diagnosticId: diagnosticId ? diagnosticId : null,
    examDefinitionId,
    medicalRequest,
  });
  return response.data;
};

export const addAdminVoucher = async (payload: any, isExam?: boolean) => {
  const response = await api.post("/Voucher/addadmin", {
    programcode: programCode,
    voucherConfigurationCode: isExam ? "#VOUCHEREXAMCDA" : "#VOUCHERINFCDA",
    examOrInfusion: isExam ? true : false,
    ...payload,
  });

  return response.data;
};

export const addVoucherInfusion = async (
  treatmentId: string,
  isExam: boolean,
  MedicamentId?: string
) => {
  const response = await api.post("/Voucher/add", {
    programcode: programCode,
    voucherConfigurationCode: isExam ? "#VOUCHEREXAMCDA" : "#VOUCHERINFCDA",
    examOrInfusion: isExam ? true : false,
    MedicamentId: MedicamentId ? MedicamentId : null,
    treatmentId: treatmentId,
  });
  return response.data;
};

export const sendDiagnosticEmailVoucher = async (
  emailaddress: string,
  voucher: string
) => {
  const response = await api.post(`/doctor/sendemaildoctor`, null, {
    params: {
      emailaddress: emailaddress,
      voucher: voucher,
      templatename: "#VOUCHER_EXAM_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const sendDiagnosticSMSVoucher = async (
  mobilephone: string,
  voucher: string
) => {
  const response = await api.post(`/doctor/sendsmsdoctor`, null, {
    params: {
      mobilephone: mobilephone,
      voucher: voucher,
      templatename: "#VOUCHER_EXAM_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const sendTreatmentEmailVoucher = async (
  emailaddress: string,
  voucher: string,
  treatmentId: string
) => {
  const response = await api.post(`/treatment/sendemailtreatment`, null, {
    params: {
      emailaddress: emailaddress,
      voucher: voucher,
      treatmentId: treatmentId,
      templatename: "#VOUCHER_EXAM_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const sendSMSAdmin = async (
  mobilephone: string,
  voucher: string,
  crm: string,
  uf: string
) => {
  const response = await api.post(`/doctor/sendsmsdoctoradmin`, null, {
    params: {
      mobilephone,
      voucher,
      crm,
      uf,
      templatename: "#VOUCHER_EXAM_IND_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const sendEmailAdmin = async (
  emailaddress: string,
  voucher: string,
  crm: string,
  uf: string
) => {
  const response = await api.post(`/doctor/sendemaildoctoradmin`, null, {
    params: {
      emailaddress,
      voucher,
      crm,
      uf,
      templatename: "#VOUCHER_EXAM_IND_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const sendTreatmentSMSVoucher = async (
  mobilephone: string,
  voucher: string,
  treatmentId: string
) => {
  const response = await api.post(`/treatment/sendsmstreatment`, null, {
    params: {
      mobilephone: mobilephone,
      voucher: voucher,
      treatmentId: treatmentId,
      templatename: "#VOUCHER_EXAM_CDA_TRE",
      programcode: programCode,
    },
  });
  return response.data;
};

export const validateVoucher = async (voucher: string) => {
  const response = await api.post(`/Voucher/validatevoucherdoctor`, {
    programcode: programCode,
    name: voucher,
  });
  return response.data;
};

export const getDiseaseMessage = async (treatmentId: string) => {
  const response = await api.get(`/Voucher/getdiseasemessage`, {
    params: {
      healthProgramCode: programCode,
      treatmentId: treatmentId,
    },
  });

  return response.data;
};

export const verifyAllowsExams = async (
  treatmentId: string,
  examId: string
) => {
  const response = await api.get(`/Voucher/verifyallowesexams`, {
    params: {
      programCode: programCode,
      treatmentId: treatmentId,
      examDefinitionId: examId,
    },
  });

  return response.data;
};
