import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/helpers/helpers";
import { CallDetails } from "@/types/incident";

interface FormProps {
  data: CallDetails;
}

const CallView = ({ data }: FormProps) => {
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
          <Input value={data.contactName} placeholder="Nome do Contato" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={formatPhoneNumber(data.contactPhoneNumber || "")} placeholder="Celular" disabled={true} />
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

export default CallView;
