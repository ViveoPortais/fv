import { CustomSelect } from "@/components/custom/CustomSelect";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay";
import { maskedField } from "@/components/custom/MaskedField";
import GenericModal from "@/components/modals/genericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidPhoneNumber, nameRegex } from "@/helpers/helpers";
import { UFlist } from "@/helpers/select-filters";
import { useModalGeneric } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getDoctorbyCRM } from "@/services/doctor";
import { postIncident } from "@/services/openingcalls";
import { IOption, IPostIncident } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface FormProps {
  optionId: string;
  bgColor?: string;
  setSelectedOption: any;
}

const schema = z.object({
  licenseNumber: z
    .string()
    .min(1, { message: "Insira um CRM válido" })
    .regex(/^\d+$/, { message: "Apenas números são permitidos" }),
  licenseState: z.string().min(1, { message: "Insira um UF válido" }).trim(),
  doctorName: z.string().min(1, { message: "Insira nome do médico" }),
  mobilePhone: z.string().min(1, { message: "Informe o número" }),
  description: z.string().min(1, { message: "Este campo não pode estar vazio" }),
  appointmentDate: z.string().optional(),
  appointmentStartTime: z.string().optional(),
  appointmentEndTime: z.string().optional(),
  appointmentDate2: z.string().optional(),
  appointmentStartTime2: z.string().optional(),
  appointmentEndTime2: z.string().optional(),
  appointmentDate3: z.string().optional(),
  appointmentStartTime3: z.string().optional(),
  appointmentEndTime3: z.string().optional(),
});

type SchemaProps = z.infer<typeof schema>;

const ConsultancyForm = ({ optionId, bgColor, setSelectedOption }: FormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<SchemaProps>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [charCount, setCharCount] = useState(0);
  const [cellphoneError, setCellphoneError] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const session = useSession();
  let modal = useModalGeneric();
  const router = useRouter();

//   const generateTimeSlots = () => {
//     const slots = [];
//     for (let hour = 0; hour < 24; hour++) {
//       slots.push(`${hour.toString().padStart(2, "0")}:00`);
//       slots.push(`${hour.toString().padStart(2, "0")}:30`);
//     }

//     return slots.map((time) => ({ id: time, value: time }));
//   };

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    slots.push("20:00");

    return slots.map((time) => ({ id: time, value: time }));
  };

  const timeOptions: IOption[] = generateTimeSlots();

  const fetchDoctorInfo = async (licenseState: string) => {
    if (licenseState) {
      setLoading(true);
      try {
        const crm = getValues("licenseNumber");
        const ufcrm = licenseState;
        const response = await getDoctorbyCRM({ crm, ufcrm });

        if (response) {
          setValue("doctorName", response.name);
          setDoctorId(response.id);
        } else {
          toast.warning("O CRM informado pode estar irregular ou inativo");
          setValue("doctorName", "");
          setValue("licenseState", "");
        }
      } catch (error) {
        console.error("Erro ao buscar informações do médico", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModalSuccess = (nroChamado: string) => {
    modal.text = `Sua solicitação foi aberta com sucesso.<br /> O número desta solicitação é ${nroChamado}.<br /> Clique no "Sim" para acompanhar o status de suas solicitações.`;
    modal.handleYes = handleYes;
    modal.handleNo = handleNo;
    modal.openModal(true);
  };

  const handleYes = () => {
    clearForm();
    modal.openModal(false);
    router.push("/dashboard/callTracking");
  };

  const handleNo = () => {
    clearForm();
    modal.openModal(false);
    router.push("/dashboard/starts");
  };

  const clearForm = () => {
    reset();
    setDoctorId(null);
    setCellphoneError(null);
    setCharCount(0);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value = e.target.value;
    const cleanPhone = value.replace(/\D/g, "");
    if (isValidPhoneNumber(cleanPhone)) {
      field.onChange(value);
      setCellphoneError(null);
    } else {
      setCellphoneError("Telefone inválido");
      field.onChange(value);
    }
  };

  const createData = (form: SchemaProps) => {
    const data: IPostIncident = {
      contactTypeStringMapId: optionId,
      doctorId: doctorId ? doctorId : "",
      description: form.description,
      telephone1: form.mobilePhone,
      healthProgramCode: session.programCode,
      availabilityStart:
        form.appointmentDate && form.appointmentStartTime
          ? `${form.appointmentDate}T${form.appointmentStartTime}:00`
          : null,
      availabilityEnd:
        form.appointmentDate && form.appointmentEndTime
          ? `${form.appointmentDate}T${form.appointmentEndTime}:00`
          : null,
      availabilityStart2:
        form.appointmentDate2 && form.appointmentStartTime2
          ? `${form.appointmentDate2}T${form.appointmentStartTime2}:00`
          : null,
      availabilityEnd2:
        form.appointmentDate2 && form.appointmentEndTime2
          ? `${form.appointmentDate2}T${form.appointmentEndTime2}:00`
          : null,
      availabilityStart3:
        form.appointmentDate3 && form.appointmentStartTime3
          ? `${form.appointmentDate3}T${form.appointmentStartTime3}:00`
          : null,
      availabilityEnd3:
        form.appointmentDate3 && form.appointmentEndTime3
          ? `${form.appointmentDate3}T${form.appointmentEndTime3}:00`
          : null,
    };
    return data;
  };

  const onSubmit = async (data: any) => {
    const newData = createData(data);
    setLoading(true);
    try {
      const response = await postIncident(newData);

      if (response.isValidData) {
        handleModalSuccess(response.value);
      } else {
        toast.error(response.additionalMessage);
      }
    } catch (error) {
      toast.error("Erro ao abrir chamado");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    clearForm();
    setSelectedOption(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
      <LoadingOverlay isVisible={loading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input {...register("licenseNumber")} placeholder="CRM" maxLength={10} />
          {errors.licenseNumber && <span className="text-red-500 text-sm">{errors.licenseNumber.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="licenseState"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="UF"
                options={UFlist}
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  fetchDoctorInfo(value);
                }}
              />
            )}
          />
          {errors.licenseState && <span className="text-red-500 text-sm">{errors.licenseState.message}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <Input {...register("doctorName")} placeholder="Nome do Médico" disabled />
        {errors.doctorName && <span className="text-red-500 text-sm">{errors.doctorName.message}</span>}
      </div>

      <div className="flex flex-col">
        <Controller
          name="mobilePhone"
          control={control}
          render={({ field }) =>
            maskedField(
              "cellphone",
              (e) => handlePhoneChange(e, field),
              field.name,
              "Telefone do contato",
              false,
              () => {},
              field.value
            )
          }
        />
        {cellphoneError && <span className="text-red-500 text-sm">{cellphoneError}</span>}
        {errors.mobilePhone && <span className="text-red-500 text-sm">{errors.mobilePhone.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <Input type="date" {...register("appointmentDate")} placeholder="Disponibilidade 1" />
          {errors.appointmentDate && <span className="text-red-500 text-sm">{errors.appointmentDate.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentStartTime"
            control={control}
            render={({ field }) => <CustomSelect label="De" options={timeOptions} {...field} />}
          />
          {errors.appointmentStartTime && (
            <span className="text-red-500 text-sm">{errors.appointmentStartTime.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentEndTime"
            control={control}
            render={({ field }) => <CustomSelect label="Até" options={timeOptions} {...field} />}
          />
          {errors.appointmentEndTime && (
            <span className="text-red-500 text-sm">{errors.appointmentEndTime.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Input type="date" {...register("appointmentDate2")} placeholder="Disponibilidade 2" />
          {errors.appointmentDate2 && <span className="text-red-500 text-sm">{errors.appointmentDate2.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentStartTime2"
            control={control}
            render={({ field }) => <CustomSelect label="De" options={timeOptions} {...field} />}
          />
          {errors.appointmentStartTime2 && (
            <span className="text-red-500 text-sm">{errors.appointmentStartTime2.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentEndTime2"
            control={control}
            render={({ field }) => <CustomSelect label="Até" options={timeOptions} {...field} />}
          />
          {errors.appointmentEndTime2 && (
            <span className="text-red-500 text-sm">{errors.appointmentEndTime2.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Input type="date" {...register("appointmentDate3")} placeholder="Disponibilidade 3" />
          {errors.appointmentDate3 && <span className="text-red-500 text-sm">{errors.appointmentDate3.message}</span>}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentStartTime3"
            control={control}
            render={({ field }) => <CustomSelect label="De" options={timeOptions} {...field} />}
          />
          {errors.appointmentStartTime3 && (
            <span className="text-red-500 text-sm">{errors.appointmentStartTime3.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Controller
            name="appointmentEndTime3"
            control={control}
            render={({ field }) => <CustomSelect label="Até" options={timeOptions} {...field} />}
          />
          {errors.appointmentEndTime3 && (
            <span className="text-red-500 text-sm">{errors.appointmentEndTime3.message}</span>
          )}
        </div>
      </div>

      <div className="relative flex flex-col">
        <textarea
          {...register("description")}
          placeholder="Descreva com o máximo de detalhes"
          maxLength={500}
          onChange={(e) => setCharCount(e.target.value.length)}
          className="w-full p-2 border rounded-lg resize-none h-24"
        />
        <span className="absolute bottom-2 right-2 text-sm text-gray-500">{charCount}/500</span>
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div className="flex justify-between">
        <>
          <Button size={"lg"} variant={"genericModalNo"} onClick={handleBackClick}>
            Voltar
          </Button>
          <Button
            type="submit"
            size={"lg"}
            className={`${bgColor} text-white py-2 rounded-lg hover:bg-gray-500`}
            disabled={!isValid}
          >
            Enviar
          </Button>
        </>
      </div>

      <GenericModal bgColor={bgColor ? bgColor : ""} />
    </form>
  );
};

export default ConsultancyForm;
