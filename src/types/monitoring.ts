export interface MonitoringExamRequest {
    doctorId: string | null;
    crm?: string | null;
    uf?: string | null;
    email?: string | null;
    userName?: string | null;
    examDefinitions?: string[] | null;
    addressCity?: string | null;
    mobilePhone?: string | null;
    cpf?: string | null;
    name?: string | null;
    birthDate?: string | null;
    genderId?: string | null;
    disease?: string | null;
    fabryClassification?: string | null;
    programRegulation?: boolean | null;
    privacyPolicy?: boolean | null;
    healthProfessionalId?: string | null;
}

export interface ExamDefinitionFilterModel {
    classificationFabry?: string | null;
    birthDate?: string | null;
    genderStringMapId?: string | null;
    diseaseId?: string | null;
    diagnosticId?: string | null;
    fullList?: boolean | null;
}