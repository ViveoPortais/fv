export interface ExamCreateModel {
    doctorId?: string | null;
    disease?: string | null;
    examDefinition?: string | null;
    laboratoryAnalysis?: string | null;
    withDrawalDate?: string | null;
    logisticStuffId?: string | null;
    needKit?: boolean | null;
    logistics?: LogisticsModel | null;
    addressPostalCode?: string | null;
    addressName?: string | null;
    addressNumber?: string | null;
    addressComplement?: string | null;
    addressDistrict?: string | null;
    addressCity?: string | null;
    addressState?: string | null;
    telephone?: string | null;
    cpfCaregiver?: string | null;
    nameCaregiver?: string | null;
    emailAddressCaregiver?: string | null;
    birthdateCaregiver?: string | null;
    healthProfessional?: HealthProfessionalCreateModel | null;
    consentFormCompleted?: boolean | null;
    programParticipationConsent?: boolean | null;
    medicalRequestAttach?: AttachmentModel | null;
    centrifugeRequired?: boolean | null;
    name?: string | null;
    birthDate?: string | null;
    cpf?: string | null;
    voucherReceiptType?: string | null;
    healthProfessionalId?: string | null;
}

export interface LogisticsModel {
    InstitutionName?: string | null;
    InstitutionEmail?: string | null;
    description?: string | null;
    addressPostalCode?: string | null;
    addressName?: string | null;
    addressNumber?: string | null;
    addressComplement?: string | null;
    addressDistrict?: string | null;
    addressCity?: string | null;
    addressState?: string | null;
    mainContact?: string | null;
    InstitutionTelephone?: string | null;
    localTypeId?: string | null;
    amountPerMonth?: number | null;
    validity?: number | null;
    amount?: number | null;
    expirationDate?: string | null;
    recollectDate?: string | null;
    amountDayOneTurnOne?: number | null;
    amountDayOneTurnTwo?: number | null;
    amountDayOneTurnTree?: number | null;
    amountDayOneTurnFour?: number | null;
    amountDayTwoTurnOne?: number | null;
    amountDayTwoTurnTwo?: number | null;
    amountDayTwoTurnTree?: number | null;
    amountDayTwoTurnFour?: number | null;
    knownMutation?: boolean | null;
    mutationIndex?: string | null;
    needPostingCode?: boolean | null;
    emailToSendPostCode?: string | null;
}

export interface HealthProfessionalCreateModel {
    name?: string | null;
    email?: string | null;
    telephone?: string | null;
}

export interface AttachmentModel {
    fileName?: string | null;
    contentType?: string | null;
    documentBody?: string | null;
    fileSize?: string | null;
    fileType?: string | null;
    annotationTypeStringMapCode?: string | null;
    annotationTypeStringMapId?: string | null;
    healthProgramCode?: string | null;
    name?: string | null;
    annotationTypeName?: string | null;
    pendencyDescription?: string | null;
}

export interface HistoricExamModel {
    startDate?: Date;
    endDate?: Date;
    examStatus?: string;
    doctor?: string;
    numberProtocol?: string;
    patientName?: string;
    patientCPF?: string;
    addressState?: string;
    addressCity?: string;
}