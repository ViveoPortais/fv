import { Input } from "@/components/ui/input";
import { CallDetails } from "@/types/incident";

interface VoucherViewProps {
  data: CallDetails;
}

const VoucherView = ({ data }: VoucherViewProps) => {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.doctorCRM} placeholder="CRM" disabled />
        </div>

        <div className="flex flex-col">
          <Input value={data.doctorCRMUF} placeholder="UF" disabled />
        </div>
      </div>

      <div className="flex flex-col">
        <Input value={data.doctorName} placeholder="Nome do Médico" disabled />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.contactName} placeholder="Nome do Contato" disabled />
        </div>

        <div className="flex flex-col">
          <Input value={data.contactPhoneNumber} placeholder="Celular" disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input value={data.clinicUF || ""} placeholder="UF" disabled />
        </div>

        <div className="flex flex-col">
          <Input value={data.clinicCity || ""} placeholder="Cidade" disabled />
        </div>
      </div>

      <div className="relative flex flex-col">
        <textarea
          value={data.incidentDescription}
          placeholder="Descreva com o máximo de detalhes"
          maxLength={500}
          disabled={true}
          className="w-full p-2 border rounded-lg resize-none h-24"
        />
      </div>
    </div>
  );
};

export default VoucherView;
