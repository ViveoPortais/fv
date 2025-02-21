"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { getAddressByCep } from "@/services/address";
import { getDoctorbyCRM } from "@/services/doctor";
import { validateVoucher } from "@/services/voucher";
import { addDiagnostic } from "@/services/diagnostic";
import { UFlist } from "@/helpers/select-filters";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAcceptTerms } from "@/hooks/useTerms";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

import { CustomSelect } from "../custom/CustomSelect";
import { maskedField } from "../custom/MaskedField";
import { InputLoading } from "../custom/InputLoading";
import FileUploader from "../custom/FileUploader";
import { Loading } from "../custom/Loading";
import { addTreatment } from "@/services/treatment";
import { getDiseases, getMedications } from "@/services/disease";
import { TermsModal } from "./TermsModal";

const patientDefaultSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  birthdate: z.string().min(1, { message: "Campo obrigatório" }),
  cpf: z.string().min(1, { message: "Campo obrigatório" }),
  genderId: z.string(),

  email: z.string().email({ message: `Campo obrigatório` }),
  mobilephone: z.string().min(1, { message: "Campo obrigatório" }),
  telephone: z.string().optional(),

  nameCaregiver: z.string().optional(),
  birthdateCaregiver: z.string().optional(),
  cpfCaregiver: z.string().optional(),

  addressPostalCode: z.string().min(1, { message: "Campo obrigatório" }),
  addressState: z.string().min(1, { message: "Campo obrigatório" }),
  addressCity: z.string().min(1, { message: "Informe a cidade" }),
  addressName: z.string().min(1, { message: "Campo obrigatório" }),
  addressNumber: z.string().min(1, { message: "Campo obrigatório" }),
  addressDistrict: z.string().min(1, { message: "Campo obrigatório" }),
  addressComplement: z.string().optional(),

  doctorId: z.string(),

  // regulation: z.boolean().default(false).refine((val) => val === true, {
  //     message: "É necessário aceitar os termos de Consentimento e de Privacidade",
  // }),
  personalData: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "As informações devem ser verdadeiras para continuar",
    }),
});

const typePatientSchema = z.enum(["diagnostic", "treatment"]);

const diagnosticPatientSchema = z.object({
  typePatient: z.literal(typePatientSchema.enum.diagnostic),
  vouchername: z.string().min(1, { message: "Campo obrigatório" }),
});

const treatmentPatientSchema = z.object({
  typePatient: z.literal(typePatientSchema.enum.treatment),

  diseaseId: z.string().min(1, { message: "Campo obrigatório" }),
  medicamentId: z.string().min(1, { message: "Campo obrigatório" }),
});

const schemaCondition = z.discriminatedUnion("typePatient", [
  diagnosticPatientSchema,
  treatmentPatientSchema,
]);

const patientSignUpSchema = z.intersection(
  patientDefaultSchema,
  schemaCondition
);

type PatientSignUpSchemaProps = z.infer<typeof patientSignUpSchema>;

export function PatientSignUp() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PatientSignUpSchemaProps>({
    resolver: zodResolver(patientSignUpSchema),
  });

  const { fileData } = useFileUpload();
  const typePatient = watch("typePatient");
  const diseaseId = watch("diseaseId");
  const router = useRouter();
  const termsModal = useAcceptTerms();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDoctorInfoLoading, setIsDoctorInfoLoading] = useState(false);
  const [getLocationInfoLoading, setGetLocationInfoLoading] = useState(false);
  const [isLoadingMedication, setIsLoadingMedication] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [medicationList, setMedicationList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);

  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    licenseNumber: "",
    licenseState: "",
    isCheckedByVoucher: false,
  });

  useEffect(() => {
    getDiseases()
      .then((res) => {
        setDiseaseList(
          res.map((disease: any) => ({
            id: disease.id,
            value: disease.name,
          }))
        );
      })
      .catch((err) => {
        toast.error("Erro ao buscar dados de doença do programa");
      });
  }, []);

  useEffect(() => {
    if (fileData.fileName !== "") {
      setIsFileUploaded(true);
    } else {
      setIsFileUploaded(false);
    }
  }, [fileData, typePatient]);

  async function getMedicationList() {
    if (diseaseId) {
      setIsLoadingMedication(true);
      try {
        const response = await getMedications(diseaseId);
        if (response) {
          setMedicationList(
            response.map((medication: any) => ({
              id: medication.id,
              value: medication.name,
            }))
          );
        }
      } catch (err) {
        toast.error("Erro ao buscar medicamentos");
      }
      setIsLoadingMedication(false);
    }
  }

  async function getDoctorInfo() {
    setIsDoctorInfoLoading(true);
    try {
      const response = await getDoctorbyCRM({
        crm: doctorInfo.licenseNumber,
        ufcrm: doctorInfo.licenseState,
      });

      if (!response.name) {
        toast.error(
          "CRM Inválido, digite um CRM válido para prosseguir com o cadastro"
        );
        setValue("doctorId", "");
        setIsDoctorInfoLoading(false);
        return;
      }

      setValue("doctorId", response.id);
      setDoctorInfo({
        ...doctorInfo,
        name: response.name,
        isCheckedByVoucher: true,
      });
      setIsDoctorInfoLoading(false);
    } catch {
      toast.error("Erro ao buscar dados");
      setIsDoctorInfoLoading(false);
    }
  }

  async function handleAddress() {
    setGetLocationInfoLoading(true);
    const cep = getValues("addressPostalCode");
    try {
      const response = await getAddressByCep(cep);

      if (response) {
        setValue(
          "addressName",
          response.logradouro + " " + response.complemento
        );
        setValue("addressDistrict", response.bairro);
        setValue("addressCity", response.localidade);
        setValue("addressState", response.uf);
      }
    } catch (err) {
      toast.error("Erro ao buscar endereço");
      setValue("addressName", "");
      setValue("addressDistrict", "");
      setValue("addressCity", "");
      setValue("addressState", "");
    }
    setGetLocationInfoLoading(false);
  }

  async function checkVoucher() {
    setIsDoctorInfoLoading(true);
    const voucher = getValues("vouchername");

    if (!voucher) return;
    console.log(voucher);

    try {
      const response = await validateVoucher(voucher);

      if (response.doctorName !== "") {
        const res = await getDoctorbyCRM({
          crm: response.doctorLicenseNumber,
          ufcrm: response.doctorLicenseState,
        });

        if (!res.name) {
          setIsDoctorInfoLoading(false);
          return toast.error(
            "CRM Inválido, digite um CRM válido para prosseguir com o cadastro"
          );
        }

        setDoctorInfo({
          name: response.doctorName,
          licenseNumber: response.doctorLicenseNumber,
          licenseState: response.doctorLicenseState,
          isCheckedByVoucher: true,
        });

        setIsDoctorInfoLoading(false);
      } else {
        setIsDoctorInfoLoading(false);
        return toast.error(
          "Médico não encontrado ou não vinculado ao paciente"
        );
      }
    } catch (err) {
      setIsDoctorInfoLoading(false);
      toast.error(
        "Desculpe, não reconhecemos a informação, por favor retorne com seu médico e verifique o voucher para retomar o cadastro."
      );
    }
  }

  async function registerPatient(data: PatientSignUpSchemaProps) {
    setIsSubmitLoading(true);

    if (typePatient === "treatment") {
      const response = await addTreatment({
        ...data,
        medicalPrescriptionAttach: fileData,
      });

      console.log(response);

      if (response.isValidData === false) {
        toast.error(response.value);
        return;
      }

      toast.success(
        "Cadastro realizado com sucesso! \n Um e-mail de confirmação foi enviado para o seu e-mail juntamente com a sua senha de acesso."
      );
      router.push("/");
    } else if (typePatient === "diagnostic") {
      try {
        const response = await addDiagnostic({
          ...data,
          medicalRequestAttach: fileData,
        });

        if (response.isValidData === false) {
          toast.error(response.value);
          return;
        }

        toast.success(
          "Cadastro realizado com sucesso! \n Um e-mail de confirmação foi enviado para o seu e-mail juntamente com a sua senha de acesso."
        );
        router.push("/");
      } catch (err: any) {
        if (!!err.response.data.value) {
          toast.error(err.response.data.value);
          setIsSubmitLoading(false);
          return;
        }
        console.log(err);
        toast.error("Erro ao cadastrar paciente. Por favor, tente novamente");
        setIsSubmitLoading(false);
      }
    }

    setIsSubmitLoading(false);
  }

  return (
    <div className="text-zinc-800">
      <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
        Cadastro - Paciente
      </h1>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(registerPatient)}
      >
        <div
          className={`w-full grid grid-cols-1 gap-4 ${
            typePatient === "treatment" ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <Controller
            name="typePatient"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Doença diagnosticada?"
                options={[
                  { id: "treatment", value: "Sim" },
                  { id: "diagnostic", value: "Não" },
                ]}
                {...field}
              />
            )}
          />

          {typePatient === "treatment" ? (
            <>
              <Controller
                name="diseaseId"
                control={control}
                render={({ field: { onBlur, ...props } }) => (
                  <CustomSelect
                    label="Qual seu diagnóstico?"
                    options={diseaseList}
                    onBlur={getMedicationList}
                    {...props}
                  />
                )}
              />

              {isLoadingMedication ? (
                <InputLoading />
              ) : (
                <Controller
                  name="medicamentId"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="Medicamento prescrito"
                      options={medicationList}
                      {...field}
                    />
                  )}
                />
              )}
            </>
          ) : (
            <Input
              type="text"
              placeholder="Voucher"
              {...register("vouchername", { required: "Campo obrigatório" })}
              onBlur={checkVoucher}
              isLoading={isDoctorInfoLoading}
            />
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  () => {},
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
            <Input
              type="date"
              placeholder="Data de nascimento"
              {...register("birthdate", { required: "Campo obrigatório" })}
            />
            {errors.birthdate && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.birthdate.message}
              </span>
            )}
          </div>
          <div className="w-full md:col-span-2">
            <Input
              type="text"
              placeholder="Nome completo"
              {...register("name", { required: "Campo obrigatório" })}
            />
            {errors.name && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <Controller
              name="genderId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Sexo"
                  options={[
                    {
                      id: "4D12DF03-56ED-4B23-86F6-F794F4DEE9B4",
                      value: "Masculino",
                    },
                    {
                      id: "F9ED0818-E572-47A6-B323-65F1D5F78B07",
                      value: "Feminino",
                    },
                  ]}
                  {...field}
                />
              )}
            />
            {errors.genderId && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                Selecione o gênero
              </span>
            )}
          </div>

          <div className="w-full">
            <Input
              type="text"
              placeholder="Email"
              {...register("email", { required: "Campo obrigatório" })}
            />
            {errors.email && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="mobilephone"
              control={control}
              render={({ field }) =>
                maskedField(
                  "cellphone",
                  field.onChange,
                  field.name,
                  "Telefone",
                  false,
                  () => {},
                  field.value
                )
              }
            />
            {errors.mobilephone && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.mobilephone.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            {getLocationInfoLoading ? (
              <InputLoading />
            ) : (
              <Controller
                name="addressPostalCode"
                control={control}
                render={({ field }) =>
                  maskedField(
                    "cep",
                    field.onChange,
                    field.name,
                    "CEP",
                    false,
                    handleAddress,
                    field.value
                  )
                }
              />
            )}
            {errors.addressPostalCode && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressPostalCode.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="addressState"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  isLoading={getLocationInfoLoading}
                  label="Estado"
                  options={UFlist}
                  {...field}
                />
              )}
            />
            {errors.addressState && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressState.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Input
              isLoading={getLocationInfoLoading}
              type="text"
              placeholder="Cidade"
              {...register("addressCity", { required: "Campo obrigatório" })}
            />
            {errors.addressCity && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressCity.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <Input
              isLoading={getLocationInfoLoading}
              type="text"
              placeholder="Logradouro"
              className="md:col-span-2"
              {...register("addressName", { required: "Campo obrigatório" })}
            />
            {errors.addressName && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressName.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Input
              isLoading={getLocationInfoLoading}
              type="text"
              placeholder="Número"
              {...register("addressNumber", { required: "Campo obrigatório" })}
            />
            {errors.addressNumber && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressNumber.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              isLoading={getLocationInfoLoading}
              type="text"
              placeholder="Bairro"
              {...register("addressDistrict", {
                required: "Campo obrigatório",
              })}
            />
            {errors.addressDistrict && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressDistrict.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full">
          <Input
            isLoading={getLocationInfoLoading}
            type="text"
            placeholder="Complemento"
            {...register("addressComplement", {
              required: "Campo obrigatório",
            })}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full">
            <Input
              isLoading={isDoctorInfoLoading}
              type="text"
              placeholder="CRM"
              value={doctorInfo.licenseNumber}
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, licenseNumber: e.target.value })
              }
              disabled={doctorInfo.isCheckedByVoucher}
            />
            {errors.doctorId && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                Campo obrigatório
              </span>
            )}
          </div>

          <div className="w-full">
            <CustomSelect
              name="licenseState"
              value={doctorInfo.licenseState}
              onChange={(value) =>
                setDoctorInfo({ ...doctorInfo, licenseState: value })
              }
              onBlur={getDoctorInfo}
              isLoading={isDoctorInfoLoading}
              label="UF do CRM"
              options={UFlist}
            />
            {errors.doctorId && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                Campo obrigatório
              </span>
            )}
          </div>

          <div className="w-full md:col-span-2">
            <Input
              isLoading={isDoctorInfoLoading}
              type="text"
              placeholder="Nome do médico"
              value={doctorInfo.name}
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, name: e.target.value })
              }
              disabled={doctorInfo.isCheckedByVoucher}
            />
            {errors.doctorId && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                Campo obrigatório
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-6 mb-4 block">
          <p className="uppercase font-semibold text-sm lg:text-base mb-2">
            Faça upload da prescrição médica
          </p>
          <FileUploader innerText="Upload da prescrição médica" />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-2 ">
          <div className="w-full flex items-center gap-4 mt-4 lg:col-span-2">
            <Checkbox
              checked={termsModal.isPatientTermsAccepted}
              onCheckedChange={termsModal.acceptPatientTerms}
              disabled
            />

            <span className="uppercase text-sm">
              Afirmo que li e aceito o
              <Dialog
                open={termsModal.isTermModalOpen}
                onOpenChange={termsModal.openTermModal}
              >
                <DialogTrigger className="text-main-purple underline cursor-pointer uppercase text-sm ml-2">
                  Termo de Uso
                </DialogTrigger>

                <TermsModal type="patient" />
              </Dialog>
            </span>
          </div>
          {!termsModal.isPatientTermsAccepted && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1 h-full flex items-center">
              É necessário aceitar o termo para continuar
            </span>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="personalData"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-sm">
              AFIRMO QUE LI E CONFERI MEUS DADOS PESSOAIS E QUE TODAS AS
              INFORMAÇÕES AQUI PREENCHIDAS SÃO VERDADEIRAS
            </span>
          </div>
          {errors.personalData && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.personalData.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          size={`lg`}
          className={`mt-4 md:mt-8 ${isSubmitLoading && "bg-zinc-500"}`}
          disabled={
            !isValid ||
            !isFileUploaded ||
            isSubmitLoading ||
            !termsModal.isPatientTermsAccepted
          }
          // onClick={() => { const values = getValues(); console.log(values); console.log(errors) }}
        >
          {isSubmitLoading ? <Loading /> : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
}
