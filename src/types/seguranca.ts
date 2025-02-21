export interface SegurancaExamRequest {
    doctorId?: string | null;
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
    logistics?: LogisticsModel | null;
    healthProfessionalId?: string | null;
}

export interface LogisticsModel {
    institutionName?: string | null;
    institutionEmail?: string | null;
    addressPostalCode?: string | null;
    addressName?: string | null;
    addressNumber?: string | null;
    addressComplement?: string | null;
    addressDistrict?: string | null;
    addressCity?: string | null;
    addressState?: string | null;
    mainContact?: string | null;
    institutionTelephone?: string | null;
    localTypeId?: string | null;
    centrifugeRequired?: boolean | null;
}