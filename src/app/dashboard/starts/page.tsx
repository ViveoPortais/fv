"use client";

import ContentCard from "@/components/ContentCard";
import MessageIcon from "@/components/custom/MessageIcon";
import { DocumentModal } from "@/components/doctor/starts/contentModal";
import { getBackgroundColor } from "@/helpers/helpers";
import { useModalContent } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetMessagesCount, selectLoading, selectMessageCount } from "@/store/slices/callTrackingSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFilePdf, FaFileVideo, FaRegChartBar, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineSupportAgent, MdQuestionAnswer } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const auth = useSession();
  const bgColor = getBackgroundColor(auth.programCode);
  const modal = useModalContent();
  const countMessage = useAppSelector(selectMessageCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetMessagesCount(auth.programCode));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5 my-5">
        <ContentCard
          title="Abertura de chamados"
          bgColor={bgColor}
          hasIcon={true}
          svgIcon={MdOutlineSupportAgent}
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/openingCalls")}
        />
        <ContentCard
          title="Acompanhamento de chamados"
          bgColor={bgColor}
          hasIcon={true}
          svgIcon={() => <MessageIcon count={countMessage} />}
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/callTracking")}
        />
        <ContentCard
          title="Relatório de chamados"
          bgColor={bgColor}
          hasIcon={true}
          svgIcon={FaRegChartBar}
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/openingCalls")}
        />
        <ContentCard
          title="FAQ"
          bgColor={bgColor}
          hasIcon={true}
          svgIcon={MdQuestionAnswer}
          buttonText="Ver Mais"
          onButtonClick={() => window.open("/FAQ.pdf", "_blank")}
        />
      </div>
      {/* <DocumentModal files={filesToDisplay} /> */}
    </div>
  );
};

export default Page;
