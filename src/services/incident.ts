import { Filters, RequestStatusIncident } from "@/types/incident";
import { api } from "./api";

const programCode = "150";

export const addDocumentation = async (data: any, documentationAttach?: any) => {
  const res = await api.post("/Incident/adddocumentation", {
    ...data,
    documentationAttach: documentationAttach ? documentationAttach : null,
  });
  return res.data;
};

export const editDocumentation = async (data: any, id: string, documentationAttach?: any) => {
  const res = await api.post("/Incident/editdocumentation", {
    ...data,
    id: id,
    documentationAttach: documentationAttach ?? documentationAttach,
  });
  return res.data;
};

export const getDocsFromLib = async (filters: any) => {
  const res = await api.get("/Incident/getdocsfromlib", {
    params: {
      ...filters,
      programCode: programCode,
    },
  });
  return res.data;
};

export const getDocAttachment = async (id: any) => {
  const res = await api.post("/Incident/getdocattchment", null, {
    params: {
      annotationId: id,
      programCode: programCode,
    },
  });
  return res.data;
};

export const getIncidentList = async (filters: Filters, programCode: string) => {
  const res = await api.get("/Incident/getIncidentList", {
    params: {
      ...filters,
      programCode: programCode,
    },
  });
  return res.data;
};

export const requestStatusIncident = async (data: RequestStatusIncident) => {
  const res = await api.put("/Incident/requestStatusIncident", {
    ...data,
  });
  return res.data;
};

export const getMessagesCount = async (programCode: string) => {
  const res = await api.get("/Incident/getnewmessagescounts", {
    params: {
      programCode: programCode,
    },
  });
  return res.data;
};

export const getDetails = async (incidentId: string, programCode: string) => {
  const res = await api.get("/Incident/getIncidentDetails", {
    params: {
      incidentId: incidentId,
      programCode: programCode,
    },
  });
  return res.data;
};
