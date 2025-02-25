import { Button } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCode, setSelectedCallId, setStatusName } from "@/store/slices/callSlice";
import { fetchApproveDisapprove, selectLoading } from "@/store/slices/callTrackingSlice";
import { RequestStatusIncident } from "@/types/incident";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FaEye, FaCheck, FaTimes, FaSpinner, FaStar } from "react-icons/fa";

export type CallType = {
  id: string;
  code: string;
  statusStringMapName: string;
  contactStringMapName: string;
  requestedName: string;
  doctorName: string;
  createdOn: string;
  deliveryDone: boolean;
};

const ActionButtons = ({ row }: { row: any }) => {
  const { id, statusStringMapName, code } = row.original;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const programCode = useSession().programCode;
  const role = useSession().role;
  const router = useRouter();

  const handleApprove = () => {
    const data: RequestStatusIncident = {
      incidentId: id,
      programCode: programCode,
      statusCode: "#INCIDENT_PENDENT",
    };
    dispatch(fetchApproveDisapprove(data));
  };

  const handleDisapprove = () => {
    const data: RequestStatusIncident = {
      incidentId: id,
      programCode: programCode,
      statusCode: "#INCIDENT_CANCELED",
    };
    dispatch(fetchApproveDisapprove(data));
  };

  const handleViewDetails = () => {
    dispatch(setSelectedCallId(id));
    dispatch(setCode(code));
    dispatch(setStatusName(statusStringMapName));
    router.push("/dashboard/callDetails");
  };

  const renderButtons = () => {
    switch (statusStringMapName) {
      case "Em aprovação":
        return (
          <>
            <Button size={"sm"} className="bg-blue-400" title="Visualizar" onClick={handleViewDetails}>
              <FaEye />
            </Button>
            {role === "supervisor" && (
              <>
                <Button size={"sm"} className="bg-green-400" title="Aprovar" onClick={handleApprove} disabled={loading}>
                  {loading ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : <FaCheck />}
                </Button>
                <Button
                  size={"sm"}
                  className="bg-red-400"
                  title="Cancelar"
                  onClick={handleDisapprove}
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : <FaTimes />}
                </Button>
              </>
            )}
          </>
        );
      case "Pendente":
      case "Pendente FV":
        return (
          <>
            <Button size={"sm"} className="bg-blue-400" title="Visualizar" onClick={handleViewDetails}>
              <FaEye />
            </Button>
            {role === "supervisor" && (
              <Button size={"sm"} className="bg-red-400" title="Cancelar" onClick={handleDisapprove} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : <FaTimes />}
              </Button>
            )}
          </>
        );
      case "Finalizado":
      case "Cancelado":
        return (
          <Button size={"sm"} className="bg-blue-400" title="Visualizar" onClick={handleViewDetails}>
            <FaEye />
          </Button>
        );
      default:
        return null;
    }
  };

  return <div className="action-buttons">{renderButtons()}</div>;
};

export const columns: ColumnDef<CallType>[] = [
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => <ActionButtons row={row} />,
  },
  {
    accessorKey: "code",
    header: "Código da Solicitação",
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "statusStringMapName",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.statusStringMapName;
      let backgroundColor = "white";

      switch (status) {
        case "Em aprovação":
          backgroundColor = "black";
          break;
        case "Pendente":
          backgroundColor = "lightblue";
          break;
        case "Cancelado":
          backgroundColor = "red";
          break;
        case "Finalizado":
          backgroundColor = "green";
          break;
        case "Pendente FV":
          backgroundColor = "pink";
          break;
        default:
          backgroundColor = "white";
          break;
      }

      return (
        <span
          style={{
            backgroundColor,
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "contactStringMapName",
    header: "Categoria",
    cell: ({ row }) => row.original.contactStringMapName,
  },
  {
    accessorKey: "requestedName",
    header: "Solicitante",
    cell: ({ row }) => row.original.requestedName,
  },
  {
    accessorKey: "doctorName",
    header: "Médico",
    cell: ({ row }) => row.original.doctorName,
  },
  {
    accessorKey: "createdOn",
    header: "Data da Solicitação",
    cell: ({ row }) => new Date(row.original.createdOn).toLocaleDateString(),
  },
  {
    accessorKey: "deliveryDone",
    header: () => (
      <div className="flex justify-center">
        <FaStar />
      </div>
    ),
    cell: ({ row }) => (row.original.deliveryDone ? "New" : ""),
  },
];
