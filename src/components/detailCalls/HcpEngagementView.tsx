import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/helpers/helpers";
import { CallDetails } from "@/types/incident";
import dayjs from "dayjs";

interface HcpEngagementViewProps {
  data: CallDetails;
}

const HcpEngagementView = ({ data }: HcpEngagementViewProps) => {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.doctorCRM} placeholder="CRM" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.doctorCRMUF} placeholder="UF" disabled={true} />
        </div>
      </div>

      <div className="flex flex-col">
        <Input value={data.doctorName} placeholder="Nome do Médico" disabled={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.healthProfessionalName || ""} placeholder="Nome do Contato" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={formatPhoneNumber(data.healthProfessionalPhoneNumber || "")} placeholder="Celular" disabled={true} />
        </div>
      </div>

      <div className="flex flex-col">
        <Input value={data.clinicName || ""} placeholder="Clínica" disabled={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.clinicUF || ""} placeholder="UF" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.clinicCity || ""} placeholder="Cidade" disabled={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <Input value={data.healthProfessionalName || ""} placeholder="Nome do profissional delegado" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.healthProfessionalCorenNumber || ""} placeholder="Número do conselho" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input
            value={formatPhoneNumber(data.healthProfessionalPhoneNumber || "")}
            placeholder="Telefone do profissional delegado"
            disabled={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.appointmentDate ? dayjs(data.appointmentDate).format("DD/MM/YYYY") : ""} placeholder="Data do agendamento" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.appointmentDate ? dayjs(data.appointmentDate).format("HH:mm") : ""} placeholder="Horário do agendamento" disabled={true} />
        </div>
      </div>

      <div className="flex flex-col">
        <Input value={data.linkToInteraction || ""} placeholder="Link para interação" disabled={true} />
      </div>

      <div className="relative flex flex-col">
        <textarea
          value={data.incidentDescription}
          placeholder="Descreva com o máximo de detalhes"
          maxLength={500}
          className="w-full p-2 border rounded-lg resize-none h-24"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default HcpEngagementView;
