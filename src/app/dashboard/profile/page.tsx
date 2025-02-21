"use client";

import { LoadingOverlay } from "@/components/custom/LoadingOverlay";
import { AdressSection } from "@/components/profile/AddressSection";
import { ConfirmationDialog } from "@/components/profile/ConfirmationDialog";
import { PersonalDataSection } from "@/components/profile/PersonalDataSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { getBackgroundColor, getTextColor } from "@/helpers/helpers";
import { passwordCorrect, passwordErr } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { doctorProfileSchema, professionalProfileSchema } from "@/lib/utils";
import { getListSpecialties } from "@/services/doctor";
import { getUserInfo, updateDoctorInfo, updateRepresentativeInfo } from "@/services/user";
import { IMedicalSpecialty, IStringMap, IUpdateDoctorData } from "@/types";
import { IUpdateRepresentativeInfo } from "@/types/professions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = useSession();
  const router = useRouter();
  const accept = passwordCorrect();
  const err = passwordErr();
  const [optionsMedicalSpecialty, setMedicalSpecialtyOptions] = useState<IStringMap[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = auth.role === 'doctor' ? doctorProfileSchema : professionalProfileSchema;
  const programCode = auth.primeiroAcesso ? '983' : auth.programCode;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const [userProfile, setUserProfile] = useState<any>({
    healthProgramCode: programCode,
    name: "",
    emailAddress: "",
    licenseNumber: "",
    licenseState: "",
    mobilephone: "",
    medicalSpecialty: "",
    cpf: "",
    birthdate: "",
    addressPostalCode: "",
    addressName: "",
    addressNumber: "",
    addressComplement: "",
    addressDistrict: "",
    addressCity: "",
    addressState: "",
    addressCountry: "",
    professionalTypeStringMapId: "",
    doctorId: "",
    representativeId: "",
    healthProfessionalByProgramId: "",
    programParticipationConsent: false,
    consentToReceiveEmail: false,
    consentToReceiveSms: false,
    consentToReceivePhonecalls: false,
    consentToReceiveWhatsapp: false,
  });

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo(programCode);
      if (res.isValidData) {
        if (auth.role == "professional")
          auth.setProgramConsent(res.value.programParticipationConsent ?? false);
        setUserProfile(res.value);
        setValue("programParticipationConsent", res.value.programParticipationConsent ?? false);
        setValue("consentToReceiveEmail", res.value.consentToReceiveEmail ?? false);
        setValue("consentToReceiveSms", res.value.consentToReceiveSms ?? false);
        setValue("consentToReceivePhonecalls", res.value.consentToReceivePhoneCalls ?? false);
        setValue("consentToReceiveWhatsapp", res.value.programParticipationConsent2 ?? false);
      }
    } catch (err) {
      toast.error('Erro ao obter informações do usuário');
    }
  };

  const fetchSpecialties = async () => {
    try {
      const response = await getListSpecialties();
      const specialties = response.map((item: IMedicalSpecialty) => ({
        stringMapId: item.name,
        optionName: item.name
      }));
      setMedicalSpecialtyOptions(specialties);
    } catch (error) {
      console.error("Erro ao obter lista de especialidades", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchSpecialties();
  }, []);

  const updateDoctorProfile = async (data: any) => {
    try {
      const { consentToReceiveSms, consentToReceiveEmail, consentToReceivePhonecalls, consentToReceiveWhatsapp } = data;

      if (![consentToReceiveSms, consentToReceiveEmail, consentToReceivePhonecalls, consentToReceiveWhatsapp].includes(true)) {
        toast.error('Pelo menos uma forma de recebimento precisa ser selecionada.');
        return;
      }

      const doctorData: IUpdateDoctorData = {
        doctorId: userProfile.doctorId,
        emailAddress: data.email,
        mobileNumber: data.telephoneNumber,
        medicalSpecialty: data.specialtyDoctor,
        cpf: data.cpf,
        birthDate: data.birthDate ? data.birthDate : null,
        AddressPostalCode: data.cep,
        AddressName: data.street,
        AddressNumber: data.number,
        AddressComplement: data.complement,
        AddressDistrict: data.neighborhood,
        AddressCity: data.city,
        AddressState: data.state,
        healthProgramCode: programCode,
        programParticipationConsent: true,
        consentToReceiveEmail: data.consentToReceiveEmail,
        consentToReceiveSms: data.consentToReceiveSms,
        consentToReceivePhonecalls: data.consentToReceivePhonecalls,
        consentToReceiveWhatsapp: data.consentToReceiveWhatsapp
      };

      setIsLoading(true);
      const res = await updateDoctorInfo(doctorData);
      if (res.isValidData) {
        toast.success(res.additionalMessage);
        router.push('/dashboard/starts');
      } else {
        toast.error(res.additionalMessage);
      }
    } catch (err) {
      toast.error('Falha na atualização');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRepresentativeProfile = async (data: any) => {
    try {
      const { programParticipationConsent, consentToReceiveSms, consentToReceiveEmail, consentToReceivePhonecalls, consentToReceiveWhatsapp } = data;

      if (![programParticipationConsent].includes(true)) {
        toast.error('A participação do programa deve ser aceita.');
        return;
      }

      if (![consentToReceiveSms, consentToReceiveEmail, consentToReceivePhonecalls, consentToReceiveWhatsapp].includes(true)) {
        toast.error('Pelo menos uma forma de recebimento precisa ser selecionada.');
        return;
      }

      const representativeData: IUpdateRepresentativeInfo = {
        id: userProfile.healthProfessionalByProgramId,
        cpf: data.cpf,
        emailAddress: data.email,
        mobilePhone1: data.telephoneNumber,
        programCode: programCode,
        birthDate: data.birthDate ? data.birthDate : null,
        AddressPostalCode: data.cep,
        AddressName: data.street,
        AddressNumber: data.number,
        AddressComplement: data.complement,
        AddressDistrict: data.neighborhood,
        AddressCity: data.city,
        AddressState: data.state,
        programParticipationConsent: data.programParticipationConsent,
        consentToReceiveEmail: data.consentToReceiveEmail,
        consentToReceiveSms: data.consentToReceiveSms,
        consentToReceivePhonecalls: data.consentToReceivePhonecalls,
        consentToReceiveWhatsapp: data.consentToReceiveWhatsapp
      };

      setIsLoading(true);
      const res = await updateRepresentativeInfo(representativeData);
      if (res.isValidData) {
        toast.success(res.additionalMessage);
        router.push('/dashboard/starts');
      } else {
        toast.error(res.additionalMessage);
      }
    } catch (err) {
      toast.error('Falha na atualização');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChangesProfile = (data: any) => {
    if (auth.role === 'doctor') {
      updateDoctorProfile(data);
    } else if (auth.role === 'professional') {
      updateRepresentativeProfile(data);
    }
  };

  const onConfirm = (data: any) => {
    handleSaveChangesProfile(data);
    setIsDialogOpen(false);
  };

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    setIsDialogOpen(true);
  };

  const bgColor = getBackgroundColor(programCode);
  const textColor = getTextColor(programCode);

  return (
    <div className="h-full w-full">
      <LoadingOverlay isVisible={isLoading} />

      <h1 className={`${bgColor} p-4 rounded-xl w-full text-start text-white font-semibold text-lg md:text-2xl mb-8`}>
        Meus dados
      </h1>

      <form
        className="flex flex-col gap-4 h-full"
        onSubmit={handleSubmit(handleFormSubmit)}
      >

        <PersonalDataSection
          control={control}
          email={userProfile.emailAddress}
          errors={errors}
          licenseNumber={userProfile.licenseNumber}
          licenseState={userProfile.licenseState}
          name={userProfile.name}
          options={optionsMedicalSpecialty}
          profileType={auth.role}
          specialty={userProfile.medicalSpecialty}
          telephoneNumber={userProfile.mobilephone}
          cpf={userProfile.cpf}
          setValue={setValue}
        />

        <Separator className={bgColor} />

        <AdressSection
          control={control}
          errors={errors}
          birthDate={userProfile.birthdate}
          cep={userProfile.addressPostalCode}
          city={userProfile.addressCity}
          complement={userProfile.addressComplement}
          neighborhood={userProfile.addressDistrict}
          number={userProfile.addressNumber}
          state={userProfile.addressState}
          street={userProfile.addressName}
          setValue={setValue}
          setFocus={setFocus}
        />

        <div className="w-full">
          <div className="w-full flex flex-wrap gap-4">
            <div className="flex items-center gap-4 w-full">
              <Controller
                name="programParticipationConsent"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked: boolean) => {
                      field.onChange(checked);
                    }}
                    disabled={auth.role == "professional" && !auth.programConsent ? false : true}
                  />
                )}
              />
              <span className="uppercase text-[11px]">
                Aceito participar do programa{" "}
                <a
                  href="/Regulamento_Programa_Rare 1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textColor} underline`}
                >
                  Visualizar documento
                </a>
              </span>

              <Controller
                name="consentToReceiveSms"
                control={control}
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

              <Controller
                name="consentToReceiveEmail"
                control={control}
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

              <Controller
                name="consentToReceivePhonecalls"
                control={control}
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

              <Controller
                name="consentToReceiveWhatsapp"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span className="uppercase text-[11px]">
                Aceito receber mensagens de WhatsApp
              </span>
            </div>
            {auth.role == "professional" && !auth.programConsent && (
              <span className={`ml-2 w-full text-xs ${textColor} mt-2 h-full flex items-center`}>
                É necessário aceitar participar do programa para continuar
              </span>
            )}
          </div>
        </div>

        <ConfirmationDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleSubmit(onConfirm)}
          userName={auth.name}
        />

        <div className="flex justify mt-4">
          <Button type="submit" size="lg" className={`mt-4 md:mt-3 ${bgColor}`}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
