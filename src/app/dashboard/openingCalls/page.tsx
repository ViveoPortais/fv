"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { getOptionsOpeningCalls } from "@/services/openingcalls";
import { IStringMapData } from "@/types";
import VoucherForm from "@/components/openingCalls/forms/VoucherForm";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay";
import { getBackgroundColor, getTextColor } from "@/helpers/helpers";
import CallForm from "@/components/openingCalls/forms/CallForm";
import HcpEngagementForm from "@/components/openingCalls/forms/HcpEngagement";
import CooperativeNurseForm from "@/components/openingCalls/forms/CooperativeNurse";
import ConsultancyForm from "@/components/openingCalls/forms/ConsultancyForm";

interface IOption {
  id: string;
  value: string;
}

interface FormProps {
  optionId: string;
  bgColor?: string;
}

const OpeningCalls = () => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  let auth = useSession();

  const formComponents: Record<string, React.FC<FormProps>> = {
    // Mapeamento das opções para os componentes de formulário correspondentes
    "enfermeiro(a) cooperado(a)": CooperativeNurseForm,
    "acesso ao laudo": CallForm,
    "outros": CallForm,
    "acesso ao site do programa / 0800": CallForm,
    "consultoria": ConsultancyForm,
    "kit": CallForm,
    "facilitação engajamento hcp": HcpEngagementForm,
    "envio de amostra": CallForm,
    "voucher para coleta em laboratório": VoucherForm,
  };

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data: IStringMapData = {
          entityName: "Incident",
          attributeName: "ContactTypeStringMap",
          programCode: auth.programCode
        };
        const response = await getOptionsOpeningCalls(data);

        const formattedOptions: IOption[] = response.map((item: any) => ({
          id: item.stringMapId,
          value: item.optionName
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [auth.programCode]);

  const handleButtonClick = (option: IOption) => {
    setSelectedOption(option);
  };

  const handleBackClick = () => {
    setSelectedOption(null);
  };

  const FormComponent = selectedOption ? formComponents[selectedOption.value.toLowerCase()] : null; // Seleciona o componente de formulário baseado na opção

  const bgColor = getBackgroundColor(auth.programCode);
  const textColor = getTextColor(auth.programCode);

  return (
    <div className="h-full w-full">
      <LoadingOverlay isVisible={loading} />
      <div className="flex flex-col min-h-screen p-6">
        {!selectedOption ? (
          <>
            <h1 className={`text-lg font-bold mb-4 text-center ${textColor}`}>Selecione um tipo de chamado</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {options.map((option) => (
                <Button
                  key={option.id}
                  size="lg"
                  className={`w-full ${bgColor}`}
                  onClick={() => handleButtonClick(option)}
                >
                  {option.value}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center mb-4">
                <h1
                  className={`text-lg font-bold cursor-pointer ${textColor} hover:text-gray-500`}
                  onClick={handleBackClick}
                >
                  Abertura de chamados
                </h1>
                <h1 className={`text-lg font-bold ${textColor}`}>/{selectedOption.value}</h1>
              </div>
            </div>

            {FormComponent && <FormComponent optionId={selectedOption.id} bgColor={bgColor} />}
          </>
        )}
      </div>
    </div>
  );
};

export default OpeningCalls;
