import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/helpers/helpers";
import { CallDetails } from "@/types/incident";
import dayjs from "dayjs";

interface FormProps {
  data: CallDetails;
}

const ConsultancyView = ({ data }: FormProps) => {
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

      <div className="flex flex-col">
        <Input value={formatPhoneNumber(data.contactPhoneNumber || "")} disabled={true} placeholder="Telefone do Contato" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <Input
            value={data.availabilityStart ? dayjs(data.availabilityStart).format("DD/MM/YYYY") : ""}
            placeholder="Disponibilidade 1"
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="De"
            value={data.availabilityStart ? dayjs(data.availabilityStart).format("HH:mm") : ""}
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="Até"
            value={data.availabilityEnd ? dayjs(data.availabilityEnd).format("HH:mm") : ""}
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            value={data.availabilityStart2 ? dayjs(data.availabilityStart2).format("DD/MM/YYYY") : ""}
            placeholder="Disponibilidade 2"
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="De"
            value={data.availabilityStart2 ? dayjs(data.availabilityStart2).format("HH:mm") : ""}
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="Até"
            value={data.availabilityEnd2 ? dayjs(data.availabilityEnd2).format("HH:mm") : ""}
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            value={data.availabilityStart3 ? dayjs(data.availabilityStart3).format("DD/MM/YYYY") : ""}
            placeholder="Disponibilidade 3"
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="De"
            value={data.availabilityStart3 ? dayjs(data.availabilityStart3).format("HH:mm") : ""}
            disabled={true}
          />
        </div>

        <div className="flex flex-col">
          <Input
            placeholder="Até"
            value={data.availabilityEnd3 ? dayjs(data.availabilityEnd3).format("HH:mm") : ""}
            disabled={true}
          />
        </div>
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

export default ConsultancyView;
