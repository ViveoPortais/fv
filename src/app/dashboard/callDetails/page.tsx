"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  callDetails,
  callStatusName,
  clearCode,
  clearSelectedCallId,
  clearStatusName,
  code,
  fetchCall,
  selectedCallId,
} from "@/store/slices/callSlice";
import useSession from "@/hooks/useSession";
import { CallDetails } from "@/types/incident";
import CallView from "@/components/detailCalls/CallView";
import ConsultancyView from "@/components/detailCalls/ConsultancyView";
import HcpEngagementView from "@/components/detailCalls/HcpEngagementView";
import VoucherView from "@/components/detailCalls/VoucherView";
import CooperativeNurseView from "@/components/detailCalls/CooperativeNurseView";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay";
import ChatCall from "@/components/detailCalls/ChatCall";
import { useRouter } from "next/navigation";
import {
  fetchApproveDisapprove,
  fetchGetIncidentAudit,
  selectIncidentAudit,
  selectLoading,
} from "@/store/slices/callTrackingSlice";
import HistoryCallModal from "@/components/modals/HistoryCallModal";
import ActionButtons from "@/components/detailCalls/ActionButtonsDetails";

const formComponentMap: Record<string, React.FC<{ data: CallDetails }>> = {
  "acesso ao laudo": CallView,
  outros: CallView,
  "acesso ao site do programa / 0800": CallView,
  consultoria: ConsultancyView,
  kit: CallView,
  "facilitação engajamento hcp": HcpEngagementView,
  "envio de amostra": CallView,
  "voucher para coleta em laboratório": VoucherView,
  "enfermeiro(a) cooperado(a)": CooperativeNurseView,
};

const ViewCall = () => {
  const callId = useAppSelector(selectedCallId);
  const callCode = useAppSelector(code);
  const dispatch = useAppDispatch();
  const call = useAppSelector(callDetails);
  const loading = useAppSelector((state) => state.call.loading);
  const programCode = useSession().programCode;
  const role = useSession().role;
  const router = useRouter();
  const historyData = useAppSelector(selectIncidentAudit);
  const loadingHistory = useAppSelector(selectLoading);
  const statusName = useAppSelector(callStatusName);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCall({ incidentId: callId!, programCode: programCode }));
  }, [dispatch, role]);

  const handleBack = () => {
    dispatch(clearSelectedCallId());
    dispatch(clearCode());
    dispatch(clearStatusName());
    router.push("/dashboard/callTracking");
  };

  if (!call) return null;

  const FormComponent = formComponentMap[call?.contactTypeStringMapName?.toLowerCase()] || null;

  const handleAction = async (statusCode: string) => {
    await dispatch(fetchApproveDisapprove({ incidentId: callId!, programCode, statusCode }));
    handleBack();
  };

  const handleHistory = async () => {
    await dispatch(fetchGetIncidentAudit({ incidentId: callId!, programCode }));
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <div className="w-full space-y-4 p-4">
      <LoadingOverlay isVisible={loading} />
      <div className="flex justify-end mr-4">
        <span className="text-sm md:text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-md">
          Chamado: {callCode}
        </span>
      </div>
      <FormComponent data={call} />
      <ChatCall incidentId={callId!} programCode={programCode} />
      <div className="text-center">
        <span className="text-sm md:text-lg font-semibold text-red-400">
          Atenção para a divulgação indevida de dados sigilosos dos pacientes e possíveis relatos de farmacovigilância
        </span>
      </div>
      <ActionButtons
        role={role}
        statusName={statusName!}
        handleAction={handleAction}
        handleHistory={handleHistory}
        handleBack={handleBack}
        loadingHistory={loadingHistory}
      />
      <HistoryCallModal isOpen={isHistoryModalOpen} onClose={closeHistoryModal} historyData={historyData} />
    </div>
  );
};

export default ViewCall;
