export interface IUserData {
    name: string;
    emailAddress: string;
    licenseNumber: string;
    licenseState: string;
    mobilephone: string;
    medicalSpecialty: string;
    login: string;
    cpf: string;
    birthdate: string;
    addressPostalCode: string;
    addressName: string;
    addressNumber: string;
    addressComplement: string;
    addressDisctrict: string;
    addressCity: string;
    addressState: string;
    addressCountry: string;
    professionalTypeStringMapId: string
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}