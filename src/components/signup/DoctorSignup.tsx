"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAcceptTerms } from "@/hooks/useTerms";
import { UFlist, medicSpecialtyFilter } from "@/helpers/select-filters";
import { addDoctor, getDoctorbyCRM, getListSpecialties } from "@/services/doctor";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { maskedField } from "../custom/MaskedField";
import { CustomSelect } from "../custom/CustomSelect";
import { CustomFilterSelect } from "../custom/CustomFilterSelect";
import { Loading } from "../custom/Loading";
import { TermsModal } from "./TermsModal";
import { useAccept, useModal, useModalEmail } from "@/hooks/useModal";
import { RescueRegister } from "./RescueRegister";
import { AcceptRegister } from "./AcceptRegister";
import { RescueRegisterEmail } from "./RescueRegisterEmail";
import { addProfessional, getOptionsProfessions } from "@/services/professions";
import { IMedicalSpecialty, IStringMap } from "@/types";
import isValidCPF, { cpfRegex, isValidPhoneNumber, mobilephoneRegex, nameRegex } from "@/helpers/helpers";

const registerSignUpSchema = z.object({
  doctorName: z.string()
    .min(1, { message: "Insira seu nome" })
    .regex(nameRegex, { message: "Nome inválido" }),
  cpf: z.string().min(1, { message: "Insira seu CPF" })
    .regex(cpfRegex, { message: "CPF inválido" })
    .refine(cpf => isValidCPF(cpf), { message: "CPF inválido" }),
  licenseNumber: z.string().min(1, { message: "Insira um CRM válido" }),
  licenseState: z.string().min(1, { message: "Insira um UF válido" }),
  medicalSpecialty: z.string().optional(),
  emailAddress: z.string().email({ message: `Insira um e-mail válido` }),
  telephoneNumber: z.string()
    .min(1, { message: "Informe o número" }),
  professions: z.string().min(1, { message: "Selecione uma profissão" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos um caractere especial" }),
  confirmPassword: z.string()
    .min(1, { message: "A confirmação da senha é obrigatória" }),

  receiveTextMessages: z.boolean().optional(),
  receiveEmails: z.boolean().optional(),
  receivePhoneCalls: z.boolean().optional(),
  receiveWhatsApp: z.boolean().optional(),

}).refine(data => data.password === data.confirmPassword, {
  message: "A confirmação da senha não coincide com a senha",
  path: ['confirmPassword'],
}).refine(data => {
  return data.receiveTextMessages || data.receiveEmails || data.receivePhoneCalls || data.receiveWhatsApp;
}, {
  message: "Pelo menos uma forma de contato deve ser selecionada",
  path: ['receivePhoneCalls', 'receiveEmails', 'receiveTextMessages', 'receiveWhatsApp'],
})
  .refine(data => {
    if (data.professions === "70fca5cf-ce3d-466e-bc5e-9ec9945cb35c")
      return data.medicalSpecialty && data.medicalSpecialty.trim() !== "";
    else
      return true;
  }, {
    message: "Informa a especialidade",
    path: ['medicalSpecialty'],
  });

type RegisterSignUpSchemaProps = z.infer<typeof registerSignUpSchema>;

export function DoctorSignUp() {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterSignUpSchemaProps>({
    resolver: zodResolver(registerSignUpSchema),
    mode: 'onChange',
  });

  const termsModal = useAcceptTerms();
  const modalRescue = useModal();
  const modalAccept = useAccept();
  const useEmail = useModalEmail();
  const professionsSelected = watch("professions");

  const [medicalSpecialtyOptions, setMedicalSpecialtyOptions] = useState<IStringMap[]>([]);
  const [isDoctorInfoLoading, setIsDoctorInfoLoading] = useState(false);
  const [isProfessionsLoading, setIsProfessionsLoading] = useState(false);
  const [addDoctorLoading, setAddDoctorLoading] = useState(false);
  const [optionsProfessions, setOptionsProfessions] = useState<IStringMap[]>([]);
  const [cellphoneError, setCellphoneError] = useState<string | null>(null);

  const createListSpecialties = async () => {
    try {
      const response = await getListSpecialties();
      const medicalSpecialtiesMapped: IStringMap[] = response.map((item: IMedicalSpecialty) => ({
        stringMapId: item.id.toString(),
        optionName: item.name
      }));

      setMedicalSpecialtyOptions(medicalSpecialtiesMapped);
    } catch (error) {
      console.error("Erro ao obter lista de especialidades", error);
    }
  }

  const fetchDoctorInfo = async (licenseState: string) => {
    if (licenseState) {
      setIsDoctorInfoLoading(true);
      setValue("medicalSpecialty", '');
      try {
        const crm = getValues("licenseNumber");
        const ufcrm = licenseState;
        const response = await getDoctorbyCRM({ crm, ufcrm });

        if (response) {
          setValue("doctorName", response.name);
          setValue("emailAddress", response.email);
          setValue("telephoneNumber", response.telephone);
          await createListSpecialties();
        } else {
          toast.warning('o CRM informado pode estar irregular ou inativo');
          setValue('licenseState', '');
          setValue("doctorName", '');
          setValue("emailAddress", '');
          setValue("telephoneNumber", '');
        }
      } catch (error) {
        console.error("Erro ao buscar informações do médico", error);
      } finally {
        setIsDoctorInfoLoading(false);
      }
    }
  };

  const createDoctorData = (data: RegisterSignUpSchemaProps) => ({
    Name: data.doctorName,
    cpf: data.cpf,
    emailAddress: data.emailAddress,
    telephoneNumber: data.telephoneNumber,
    password: data.password,
    programParticipationConsent: true,
    licenseNumber: data.licenseNumber,
    licenseState: data.licenseState,
    medicalSpecialty: data.medicalSpecialty,
    consentToReceiveSms: data.receiveTextMessages,
    consentToReceiveEmail: data.receiveEmails,
    consentToReceivePhonecalls: data.receivePhoneCalls,
    consentToReceiveWhatsapp: data.receiveWhatsApp
  });

  const createProfessionalData = (data: RegisterSignUpSchemaProps, selectedValues: any) => {
    const idProfessional = getValues('professions');

    return {
      name: data.doctorName,
      cpf: data.cpf,
      licenseNumber: data.licenseNumber,
      licenseState: data.licenseState,
      emailAddress1: data.emailAddress,
      mobilephone1: data.telephoneNumber,
      password: data.password,
      programParticipationConsent: true,
      professionalTypeStringMapId: idProfessional,
      consentToReceivePhoneCalls: data.receivePhoneCalls,
      consentToReceiveSms: data.receiveTextMessages,
      consentToReceiveEmail: data.receiveEmails
    };
  };

  const handleRegistration = async (data: RegisterSignUpSchemaProps, selectedValues: any) => {
    if (selectedValues?.optionName === "Médico") {
      return await addDoctor(createDoctorData(data));
    } else {
      return await addProfessional(createProfessionalData(data, selectedValues));
    }
  };

  const onSubmit = async (data: RegisterSignUpSchemaProps) => {
    if (!isValid || !termsModal.isRegulationAccepted) return;

    setAddDoctorLoading(true);

    try {
      const res = await handleRegistration(data, selectedValues);
      if (res.isValidData)
        toast.success(res.additionalMessage);
      else
        toast.error(res.additionalMessage);

      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (error: any) {
      toast.error(error.response.data.value);
    } finally {
      setAddDoctorLoading(false);
      reset();
    }
  };

  const handleCrmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("licenseNumber", value);
  };

  const handleLicenseStateChange = (value: string) => {
    let crm = getValues("licenseNumber");
    setValue("licenseState", value);
    if (value === "RJ" && crm?.startsWith("52")) {
      toast.warning("Não é necessário incluir o código 52 no campo do CRM. Por favor, remova o código 52 e insira apenas o número de registro.");
      setValue("licenseState", "");
    }
    if (selectedValues?.optionName === "Médico")
      fetchDoctorInfo(value);
  };

  const handleChangeProfessional = (professionalSelected: string | undefined) => {
    setValue('medicalSpecialty', '');
    setValue('doctorName', '');
    setValue('licenseState', '');
    setValue('licenseNumber', '');
    setValue('receiveTextMessages', false);
    setValue('receiveEmails', false);
    setValue('receivePhoneCalls', false);
  }

  const selectedValues = useMemo(() => {
    return optionsProfessions.find(profession => profession.stringMapId === professionsSelected);
  }, [optionsProfessions, professionsSelected]);

  useEffect(() => {
    const createListProfessions = async () => {
      setIsProfessionsLoading(true);
      try {
        const response = await getOptionsProfessions();
        setOptionsProfessions(response);
      } catch (error) {
        console.error("Erro ao trazer profissionais", error);
      }
      finally {
        setIsProfessionsLoading(false);
      }
    };

    createListProfessions();
  }, []);

  return (
    <div className="text-zinc-800">
      <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-green-rare">
        Realizar Cadastro
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
        noValidate
      >
        <div className={professionsSelected ? "w-full grid grid-cols-1 md:grid-cols-3 gap-3" : "w-full grid grid-cols-1 gap-3"}>
          <div className="w-full">
            <Controller
              name="professions"
              control={control}
              render={({ field }) => (
                <CustomFilterSelect label="Profissionais" options={optionsProfessions}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeProfessional(selectedValues?.optionName);
                  }}
                  isLoading={isProfessionsLoading}
                />
              )}
            />
            {errors.professions && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.professions.message}
              </span>
            )}
          </div>

          {professionsSelected && (
            <>
              <div className="w-full">
                <Input
                  type="text"
                  placeholder={selectedValues?.optionName == "Médico" ? "CRM" : "Nro de Registro"}
                  maxLength={10}
                  {...register("licenseNumber", {
                    pattern: {
                      value: /^\d{1,6}$/,
                      message: selectedValues?.optionName == "Médico"
                        ? "O CRM deve conter apenas números."
                        : "O Nro de registro deve conter apenas números.",
                    },
                  })}
                  onChange={selectedValues?.optionName == "Médico" ? handleCrmChange : undefined}
                />
                {errors.licenseNumber && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.licenseNumber.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Controller
                  name="licenseState"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect label="UF" options={UFlist}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        handleLicenseStateChange(value);
                      }}
                    />
                  )}
                />
                {errors.licenseState && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.licenseState.message}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {professionsSelected && (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Nome completo"
                  isLoading={isDoctorInfoLoading}
                  {...register("doctorName", { required: "Campo obrigatório" })}
                  disabled={selectedValues?.optionName == "Médico"}
                />
                {errors.doctorName && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.doctorName.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Input
                  type="email"
                  placeholder="E-mail"
                  isLoading={isDoctorInfoLoading}
                  {...register("emailAddress", { required: "Campo obrigatório" })}
                />
                {errors.emailAddress && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.emailAddress.message}
                  </span>
                )}
              </div>
            </div>

            {selectedValues?.optionName == "Médico" && (
              <div className="w-full">
                <Controller
                  name="medicalSpecialty"
                  control={control}
                  render={({ field }) => (
                    <CustomFilterSelect
                      label="Especialidade"
                      options={medicalSpecialtyOptions}
                      {...field}
                    />
                  )}
                />
                {errors.medicalSpecialty && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.medicalSpecialty.message}
                  </span>
                )}
              </div>
            )}

            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="w-full">
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) =>
                    maskedField(
                      "cpf",
                      field.onChange,
                      field.name,
                      "CPF",
                      false,
                      () => { },
                      field.value
                    )
                  }
                />
                {errors.cpf && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.cpf.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="telephoneNumber"
                  control={control}
                  render={({ field }) => {
                    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value;

                      const cleanPhone = value.replace(/\D/g, '');
                      if (isValidPhoneNumber(cleanPhone)) {
                        field.onChange(value);
                        setCellphoneError(null);
                      } else {
                        setCellphoneError("Telefone inválido");
                        field.onChange(value);
                      }
                    }
                    return (
                      maskedField(
                        "cellphone",
                        handlePhoneChange,
                        field.name,
                        "Celular",
                        false,
                        () => { },
                        field.value
                      )
                    )
                  }}
                />
                {cellphoneError && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">{cellphoneError}</span>
                )}
                {errors.telephoneNumber && (
                  <span className="ml-2 w-full text-xs text-red-400 mt-1">
                    {errors.telephoneNumber.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Input
                  type="password"
                  icon="password"
                  placeholder="Senha"
                  className="w-full"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="w-full text-xs text-red-400 mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Input
                  type="password"
                  icon="password"
                  placeholder="Confirmar Senha"
                  className="w-full"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <span className="w-full text-xs text-red-400 mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
          <div className="w-full flex flex-row items-center gap-4 mt-4 lg:col-span-2">
            <Checkbox
              checked={termsModal.isRegulationAccepted}
              onCheckedChange={termsModal.acceptRegulation}
              disabled
            />

            <span className="uppercase text-[11px]">
              Afirmo que li e aceito o
              <Dialog
                open={termsModal.isTermModalOpen}
                onOpenChange={termsModal.openTermModal}
              >
                <DialogTrigger className="text-green-rare underline cursor-pointer uppercase text-[11px] ml-2">
                  Regulamento Programa Rare
                </DialogTrigger>

                <TermsModal type="regulation" pdfUrl="/Regulamento_Programa_Rare 1.pdf" />
              </Dialog>
            </span>
          </div>

          {!termsModal.isRegulationAccepted && (
            <span className="ml-2 w-full text-xs text-red-400 mt-2 h-full flex items-center">
              É necessário aceitar o termo para continuar
            </span>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="receiveTextMessages"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-[11px]">
              Aceito receber mensagem de texto
            </span>
          </div>
          {errors.receiveTextMessages && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.receiveTextMessages.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="receiveEmails"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-[11px]">
              Aceito receber e-mail
            </span>
          </div>
          {errors.receiveEmails && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.receiveEmails.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="receivePhoneCalls"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-[11px]">
              Aceito receber ligações telefônicas
            </span>
          </div>
          {errors.receivePhoneCalls && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.receivePhoneCalls.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="receiveWhatsApp"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-[11px]">
              Aceito receber Whatsapp
            </span>
          </div>
          {errors.receiveWhatsApp && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.receiveWhatsApp.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full flex items-center">
            <span className="font-bold italic">Os canais escolhidos serão usados para todas as futuras comunicações do programa,
              incluindo atualizações e avisos importantes
            </span>
          </div>
        </div>

        <Button
          type="submit"
          size={`lg`}
          className={`mt-4 md:mt-3 ${addDoctorLoading && "bg-green-rare"} }`}
          disabled={
            !isValid ||
            addDoctorLoading ||
            !termsModal.isRegulationAccepted
          }
        >
          {addDoctorLoading ? <Loading /> : "Cadastrar"}
        </Button>
      </form>
      <div>
        <Dialog
          open={modalRescue.isModalOpen}
          onOpenChange={modalRescue.openModal}
        >
          <RescueRegister />
        </Dialog>
      </div>
      <div>
        <Dialog open={useEmail.isModalOpen} onOpenChange={useEmail.openModal}>
          <RescueRegisterEmail />
        </Dialog>
      </div>
      <div>
        <Dialog
          open={modalAccept.isModalOpen}
          onOpenChange={modalAccept.openModal}
        >
          <AcceptRegister />
        </Dialog>
      </div>
    </div>
  );
}
