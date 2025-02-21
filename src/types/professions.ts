interface listProfessions {
    id: string;
    value: string;
}

export interface IProfessionalData {
  name?: string;
  cpf?: string;
  licenseNumber?: string | number;
  licenseState?: string;
  mobilephone1?: string;
  emailAddress1?: string;
  password?: string;
  programParticipationConsent?: boolean;
  consentToReceivePhoneCalls?: boolean;
  consentToReceiveSms?: boolean;
  consentToReceiveEmail?: boolean;    
  professionalTypeStringMapId?: string;
  [key: string]: string | number | boolean | undefined;
}

  export interface IUpdateRepresentativeInfo {
    id: string;
    emailAddress?: string;
    mobilePhone1?: string;
    cpf?: string;
    programCode?: string;
    birthDate?: string;
    AddressPostalCode?: string;
    AddressName?: string;
    AddressNumber?: string;
    AddressComplement?: string;
    AddressDistrict?: string;
    AddressCity?: string;
    AddressState?: string;
    programParticipationConsent?: boolean;
    consentToReceiveEmail?: boolean | undefined;
    consentToReceiveSms?: boolean | undefined;
    consentToReceivePhonecalls?: boolean | undefined;
    consentToReceiveWhatsapp?: boolean | undefined;
  }