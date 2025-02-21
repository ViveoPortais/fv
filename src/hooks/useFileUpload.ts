import { create } from "zustand";

interface FileProps {
    fileName: string;
    contentType: string;
    documentBody: string;
    fileSize: string;
    name: string;
    healthProgramCode: string;
}

interface useFileUploadProps {
    fileData: FileProps;
    setFileData: (medicalReportFile: FileProps) => void;
    resetFileData: () => void;
}

export const useFileUpload = create<useFileUploadProps>((set) => ({

    fileData: {
        fileName: "",
        contentType: "",
        fileSize: "",
        documentBody: "",
        name: "",
        healthProgramCode: "",
    },

    setFileData: (fileData) => set({fileData}),
    
    resetFileData: () => set({ 
        fileData: {
            fileName: "",
            contentType: "",
            fileSize: "",
            documentBody: "",
            name: "",
            healthProgramCode: "",
        } 
    }),
}))