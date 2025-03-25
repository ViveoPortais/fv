import { PostChat } from "@/types/chat";
import api from "./api";

export const getChatDetails = async (incidentId: string, programCode: string) => {
  const res = await api.get("/Chat/getChatDetails", {
    params: {
      incidentId: incidentId,
      programCode: programCode,
    },
  });
  return res.data;
};

export const postChat = async (data: PostChat) => {
  const res = await api.post("/Chat/postChat", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const downloadAttachment = async (incidentId: string, programCode: string) => {
  const res = await api.get("/Annotation/download", {
    params: {
      id: incidentId,
      programCode: programCode,
    },
    responseType: "blob",
  });
  return res;
};
