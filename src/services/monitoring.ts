
import { ExamDefinitionFilterModel, MonitoringExamRequest } from "@/types/monitoring";
import { api } from "./api";

export const addExamMonitoring = async (data: MonitoringExamRequest, programCode: string) => {
  const response = await api.post("/Exam/exams", {
    ...data,
    programCode,
  });
  return response.data;
};

export const getExamDefinition = async (data: ExamDefinitionFilterModel, programCode: string) => {
  const res = await api.get("/ExamDefinition/GetExamDefinition", {
    params: {
      programCode: programCode,
      ...data
    }
  });
  return res.data;
}