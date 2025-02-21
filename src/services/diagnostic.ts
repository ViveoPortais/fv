import { ExamCreateModel, HistoricExamModel } from "@/types/diagnostic";
import { api } from "./api";
import { DiagnosticData, TreatmentData } from "@/types";

const programCode = "150";

export const addDiagnostic = async (data: DiagnosticData) => {
  const response = await api.post("/Diagnostic/add", {
    ...data,
    programCode,
  });
  return response.data;
};

export const getDiagnostics = async (filters: any) => {
  const response = await api.get("/Patient/getpatients", {
    params: {
      programcode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getDoctors = async (filters: any) => {
  const response = await api.get("/doctor/getdoctors", {
    params: {
      programcode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getExamByDiagnostic = async (
  patient?: string,
  startDate?: string,
  endDate?: string,
  pageSize?: number
) => {
  const response = await api.get("/Diagnostic/getexambydiagnostic", {
    params: {
      programcode: programCode,
      pageSize: pageSize,
      PatientName: patient,
      StartDate: startDate,
      EndDate: endDate,
    },
  });
  return response.data.data;
};

export const getPatientExamDiagnosticsById = async (
  id: string,
  filters?: any
) => {
  const response = await api.get("/Diagnostic/getexambydiagnosticid", {
    params: {
      diagnosticId: id,
      programCode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getPatientExamDiagnostics = async (filters: any) => {
  const response = await api.get("/Diagnostic/getexambydiagnostic", {
    params: {
      programcode: programCode,
      ...filters,
    },
  });
  return response.data.data;
};

export const getDiagnosticById = async (id: string, filters?: any) => {
  const response = await api.get("/Diagnostic/getdiagnosticbyid", {
    params: {
      programcode: programCode,
      id: id,
      ...filters,
    },
  });
  return response.data;
};

export const inactivateDiagnosticById = async (id: string) => {
  const response = await api.post(
    "/Diagnostic/inactivatediagnosticbyid",
    null,
    {
      params: {
        programcode: programCode,
        id: id,
      },
    }
  );
  return response.data;
};

export const requestDiagnosticExamList = async (id: string, exams: any) => {
  const response = await api.post(
    "/Diagnostic/requestdiagnosticexamlist",
    exams,
    {
      params: {
        programcode: programCode,
        id: id,
      },
    }
  );
  return response.data;
};

export const getDiagnosticsAdmin = async (filters?: any) => {
  const response = await api.get("Diagnostic/getdiagnosticsadmin", {
    params: {
      ...filters,
      programCode: programCode,
    },
  });

  return response.data.data;
};

export const historyDiagnotics = async (data: HistoricExamModel, programCode: string) => {
  const response = await api.get('/Diagnostic/getdiagnostics', {
    params: {
      ...data,
      programCode: programCode
    }
  });
  return response.data;
}

export const addDiagnosticExam = async (data: ExamCreateModel, programCode: string) => {
  const response = await api.post('Diagnostic/add', {
    ...data,
    programCode: programCode
  });
  return response.data;
};

export const getDiagnosticByCpf = async (programCode: string, cpf: string) => {
  const response = await api.get('/Diagnostic/getdiagnosticbycpf', {
    params: {
      programCode: programCode,
      cpf: cpf
    }
  });
  return response;
}
