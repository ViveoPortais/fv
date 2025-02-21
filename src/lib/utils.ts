import isValidCPF, { cpfRegex, mobilephoneRegex, nameRegex } from "@/helpers/helpers";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { any, z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Esquemas de validação
export const forgetPasswordValidationSchema = z.object({
  professionalType: z.string().min(1, { message: "Selecione uma profissão" }),
  licenseNumber: z.string().min(1, { message: "Insira um CRM ou número de registro válido" }),
  licenseState: z.string().min(1, { message: "Informe um estado" }),
  sendByEmail: z.boolean(),
  sendBySms: z.boolean(),
}).refine(data => data.sendByEmail || data.sendBySms, {
  message: "Você deve escolher pelo menos uma opção para redefinir sua senha",
  path: ["sendBySms"],
});

export type forgetPasswordValidationProps = z.infer<typeof forgetPasswordValidationSchema>;

//------------------------ || --------------------------//

export const doctorProfileSchema = z.object({
  specialtyDoctor: z.string().min(1).optional(),
  email: z.string().email({ message: `Insira um e-mail válido` }).optional(),
  telephoneNumber: z.string()
    .min(1, { message: "Insira um número de celular válido" })
    .optional(),
  cpf: z.string()
    .min(1, { message: "Insira seu CPF" })
    .regex(cpfRegex, { message: "CPF inválido" })
    .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" }),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  birthDate: z.string().optional(),
  programParticipationConsent: z.boolean().optional(),
  consentToReceiveEmail: z.boolean().optional(),
  consentToReceiveSms: z.boolean().optional(),
  consentToReceivePhonecalls: z.boolean().optional(),
  consentToReceiveWhatsapp: z.boolean().optional(),
});

export const professionalProfileSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }).optional(),
  telephoneNumber: z.string().min(1).optional(),
  cpf: z.string()
    .min(1, { message: "Insira seu CPF" })
    .regex(cpfRegex, { message: "CPF inválido" })
    .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" }),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  birthDate: z.string().optional(),
  programParticipationConsent: z.boolean().optional(),
  consentToReceiveEmail: z.boolean().optional(),
  consentToReceiveSms: z.boolean().optional(),
  consentToReceivePhonecalls: z.boolean().optional(),
  consentToReceiveWhatsapp: z.boolean().optional(),
});

export type DoctorProfileValidationProps = z.infer<typeof doctorProfileSchema>;
export type ProfessionalProfileValidationProps = z.infer<typeof professionalProfileSchema>;

//------------------------ || --------------------------//

export const examRequestSchema = z.object({
  crm: z.string().min(1, { message: "CRM é obrigatório" }).optional(),
  uf: z.string().min(1, { message: "UF é obrigatório" }).optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  userName: z.string().min(1, { message: "Nome é obrigatório" }).optional(),

  diseases: z.string().min(1, { message: "Selecione uma suspeita" }),
  typeRequest: z.string().min(1, { message: "Selecione um tipo de solicitação" }),
  laboratory: z.string().min(1, { message: "Laboratório é obrigatório" }),

  collectionDate: z.string().optional(),
  collectionQuantity: z.string()
    .optional(),
  isKitRequired: z.string().optional(),
  isNurseRequired: z.string().optional(),
  materialRequested: z.string().optional(),

  suggestNurse: z.string()
    .min(1, { message: "Campo 'Precisa de Enfermeiro?' não pode estar vazio" })
    .refine(val => val === 'sim' || val === 'nao', {
      message: "Selecione 'Sim' ou 'Não' para 'Precisa de Enfermeiro?'"
    })
    .optional(),

  nurseName: z.string().optional(),
  nurseEmail: z.string().optional(),
  nurseCellphone: z.string().optional(),

  address: z.object({
    name: z.string().optional(),
    responsibleName: z.string().optional(),
    address: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    phone: z.string().optional(),
    cpf: z.string().optional(),
    birthDate: z.string().optional(),
    cep: z.string().optional(),
  }).optional(),

  location: z.object({
    local: z.string().optional(),
    name: z.string().optional(),
    observacoes: z.string().optional(),
    responsibleName: z.string().optional(),
    address: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    phone: z.string()
      .optional(),
    cpf: z.string()
      .regex(cpfRegex, { message: "CPF inválido" })
      .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" })
      .optional(),
    birthDate: z.string().optional(),
    cep: z.string().optional(),
    email: z.string().email({ message: "E-mail inválido" }).optional(),
  }).optional(),

  consent: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Consentimento Livre e Esclarecido" }),
  consentData: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Compartilhamento de dados" }),

  amountPerMonth: z.number().optional(),
  validity: z.number().optional(),
  amount: z.number().optional(),
  expirationDate: z.string().optional(),

  amountDayOneTurnOne: z.number().optional(),
  amountDayOneTurnTwo: z.number().optional(),
  amountDayOneTurnThree: z.number().optional(),
  amountDayOneTurnFour: z.number().optional(),
  recollectDate: z.string().optional(),
  amountDayTwoTurnOne: z.number().optional(),
  amountDayTwoTurnTwo: z.number().optional(),
  amountDayTwoTurnThree: z.number().optional(),
  amountDayTwoTurnFour: z.number().optional(),

  emailAddressCaregiver: z.string().optional(),
  deliveryType: z.string().optional(),
  cityVoucher: z.string().optional(),
  ufVoucher: z.string().optional(),
  voucherQuantity: z.string().optional(),

  needPostingCode: z.string()
  .optional(),
  emailAddressCaregiverPostCode: z.string().optional(),

  fileName: z.string().optional(),
  contentType: z.string().optional(),
  documentBody: z.string().optional(),
  fileSize: z.string().optional(),

  knownMutation: z.string().optional(),
  mutationIndex: z.string().optional(),

  centrifugeRequired: z.string().optional(),
  name: z.string().optional(),
  birthDate: z.string().optional(),
  cpf: z.string()
    .optional(),

  checkRegisteredAddress: z.boolean().optional(),
  checkRegisteredAddressInstitution: z.boolean().optional(),
}).refine((data) => {
  if (data.isKitRequired === 'nao' && !data.isNurseRequired) {
    return false;
  }
  return true;
}, {
  message: "Campo 'Precisa de Enfermeiro?' não pode estar vazio quando 'É necessário kit?' for 'Não'",
  path: ['isNurseRequired'],
});
export type examRequestValidationProps = z.infer<typeof examRequestSchema>;

//------------------------ || --------------------------//

export const teamManagementValidationSchema = z.object({
  professionalTypeStringMap: z.string().min(1, { message: "Selecione uma profissão" }),
  licenseNumberCoren: z.string().min(1, { message: "Insira um CRM ou número de registro válido" }),
  licenseStateCoren: z.string().min(1, { message: "Informe um estado" }),
  professionalName: z.string()
    .min(1, { message: "Informe o nome completo" })
    .regex(nameRegex, { message: "Nome inválido" }),
  mobilephone: z.string()
    .min(1, { message: "Informe o número" }),
  emailAddress: z.string().email({ message: `Insira um e-mail válido` }),
});

export type teamManagementValidationProps = z.infer<typeof teamManagementValidationSchema>;

//------------------------ || --------------------------//

export const teamManagementProfessionalValidationSchema = z.object({
  licenseNumber: z.string().min(1, { message: "Insira um CRM válido" }),
  licenseState: z.string().min(1, { message: "Informe um estado" }),
  professionalName: z.string().optional()
});

export type teamManagementProfessionalValidationProps = z.infer<typeof teamManagementProfessionalValidationSchema>;

//------------------------ || --------------------------//

export const alterPasswordSchema = z.object({
  oldPassword: z.string().min(8, "A senha antiga deve ter pelo menos 8 caracteres"),
  newPassword: z.string()
    .min(8, "A nova senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos um caractere especial" }),
  confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type alterPasswordProps = z.infer<typeof alterPasswordSchema>;

//------------------------ || --------------------------//

export const moritoringExamRequestSchema = z.object({
  crm: z.string().min(1, { message: "CRM é obrigatório" }).optional(),
  uf: z.string().min(1, { message: "UF é obrigatório" }).optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  userName: z.string().min(1, { message: "Nome é obrigatório" }).optional(),

  examDefinitions: z.array(z.string().uuid(), { message: "Selecione pelo menos um exame" }),

  addressCity: z.string().min(1, { message: "Cidade é obrigatória" }),
  mobilePhone: z.string()
    .min(1, { message: "Informe o número" }),
  cpf: z.string()
    .min(1, { message: "Insira seu CPF" })
    .regex(cpfRegex, { message: "CPF inválido" })
    .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" }),
  name: z.string()
    .min(1, { message: "Nome do paciente é obrigatório" })
    .regex(nameRegex, { message: "Nome inválido" }),
  birthDate: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  genderId: z.string().min(1, { message: "Informe um gênero" }),

  disease: z.string().min(1, { message: "Selecione uma suspeita" }),

  fabryClassification: z.string().optional(),

  programRegulation: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Consentimento Livre e Esclarecido" }),
  privacyPolicy: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Compartilhamento de dados" }),
});

export type monitoringExamRequestValidationProps = z.infer<typeof moritoringExamRequestSchema>;

export const segurancaExamRequestSchema = z.object({
  crm: z.string().min(1, { message: "CRM é obrigatório" }).optional(),
  uf: z.string().min(1, { message: "UF é obrigatório" }).optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  userName: z.string().min(1, { message: "Nome é obrigatório" }).optional(),

  examDefinitions: z.array(z.string().uuid(), { message: "Selecione pelo menos um exame" }),

  addressCity: z.string().min(1, { message: "Cidade é obrigatória" }),
  mobilePhone: z.string()
    .min(1, { message: "Informe o número" }),
  cpf: z.string()
    .min(1, { message: "Insira seu CPF" })
    .regex(cpfRegex, { message: "CPF inválido" })
    .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" }),
  name: z.string()
    .min(1, { message: "Nome do paciente é obrigatório" })
    .regex(nameRegex, { message: "Nome inválido" }),
  birthDate: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  genderId: z.string().min(1, { message: "Informe um gênero" }),

  disease: z.string().min(1, { message: "Selecione uma suspeita" }),  

  fabryClassification: z.string().optional(),

  centrifugeRequired: z.string().optional(),

  logistics: z.object({    
    localTypeId: z.string().optional(),
    institutionName: z.string().optional(),
    mainContact: z.string().optional(),
    addressName: z.string().optional(),
    addressNumber: z.string().optional(),
    addressComplement: z.string().optional(),
    addressDistrict: z.string().optional(),
    addressCity: z.string().optional(),
    addressState: z.string().optional(),
    institutionTelephone: z.string().optional(),
    addressPostalCode: z.string().optional(),
    institutionEmail: z.string().email({ message: "E-mail inválido" }).optional(),    
  }).optional(),

  programRegulation: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Consentimento Livre e Esclarecido" }),
  privacyPolicy: z.boolean().refine(val => val === true, { message: "É necessário aceitar o Termo de Compartilhamento de dados" }),
});

export type segurancaExamRequestValidationProps = z.infer<typeof segurancaExamRequestSchema>;