'use client'

import React, { useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaFilePdf, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";

import { getDocAttachment } from "@/services/incident";

type Props = {
  type: string;
  annotationsId: string;
};

const OpenFile = ({ type, annotationsId }: Props) => {
  const iframeRef = useRef(null as any);
  const [isLoading, setIsLoading] = useState(false);

  const OpenDocument = () => {
    setIsLoading(true);
    if (type === "video/mp4") {
      toast.loading("Vídeos podem demorar um pouco para carregar, aguarde... Não se esqueça de habilitar o pop-up do navegador. ");
    }
    getDocAttachment(annotationsId)
      .then((res) => {
        const byteCharacters = atob(res.documentBody);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: res.contentType });
        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");
      })
      .catch(() => {
        toast.error("Erro ao abrir documento");
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss();
      });
  };

  return (
    <div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex items-center justify-center">
          <div className="p-4 rounded-md">
            <CgSpinner size={24} />
          </div>
        </div>
      )}
      {type === "video/mp4" && (
        <FaVideo onClick={OpenDocument} size="2em" className="cursor-pointer" />
      )}
      {type === "application/pdf" && (
        <FaFilePdf
          onClick={OpenDocument}
          size="2em"
          className="cursor-pointer text-red-500"
        />
      )}
    </div>
  );
};

export default OpenFile;
