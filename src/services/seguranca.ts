import { SegurancaExamRequest } from "@/types/seguranca";
import api from "./api";

export const addSegurancaExm = async (data: SegurancaExamRequest, programCode: string) => {
    const response = await api.post('Diagnostic/add', {
        ...data,
        programCode: programCode
    });
    return response.data;
};