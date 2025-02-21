import { Input } from "@/components/ui/input";
import { CallDetails } from "@/types/incident";

interface CooperativeNurseViewProps {
  data: CallDetails;
}

const CooperativeNurseView = ({ data }: CooperativeNurseViewProps) => {
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <Input value={data.healthProfessionalName || ""} placeholder="Nome do(a) enfermeiro(a)" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.healthProfessionalPhoneNumber || ""} placeholder="Telefone do(a) enfermeiro(a)" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.healthProfessionalCorenNumber || ""} placeholder="Coren" disabled={true} />
        </div>

        <div className="flex flex-col">
          <Input value={data.healthProfessionalCorenUF || ""} placeholder="UF" disabled={true} />
        </div>
      </div>

      <div className="relative flex flex-col">
        <textarea
          value={data.incidentDescription}
          placeholder="Descrição"
          disabled={true}
          className="w-full p-2 border rounded-lg resize-none h-24"
        />
      </div>
    </div>
  );
};

export default CooperativeNurseView;
