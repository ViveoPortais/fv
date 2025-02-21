"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { callDetails, fetchCall, selectedCallId } from "@/store/slices/callSlice";
import useSession from "@/hooks/useSession";
import { CallDetails } from "@/types/incident";
import CallView from "@/components/detailCalls/CallView";
import ConsultancyView from "@/components/detailCalls/ConsultancyView";
import HcpEngagementView from "@/components/detailCalls/HcpEngagementView";
import VoucherView from "@/components/detailCalls/VoucherView";
import CooperativeNurseView from "@/components/detailCalls/CooperativeNurseView";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay";
// import Chat from "./Chat";

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
  const dispatch = useAppDispatch();
  const call = useAppSelector(callDetails);
  const loading = useAppSelector((state) => state.call.loading);
  const programCode = useSession().programCode;

  useEffect(() => {
    dispatch(fetchCall({ incidentId: callId!, programCode: programCode }));
  }, [dispatch]);

  if (!call) return null;

  const FormComponent = formComponentMap[call?.contactTypeStringMapName?.toLowerCase()] || null;

  return (
    <div>
      <LoadingOverlay isVisible={loading} />
      <FormComponent data={call} />
      {/* <Chat callId={params.id} /> */}
    </div>
  );
};

export default ViewCall;
