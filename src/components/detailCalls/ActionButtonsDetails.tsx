import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";

interface ActionButtonsProps {
  role: string;
  statusName: string;
  handleAction: (statusCode: string) => void;
  handleHistory: () => void;
  handleBack: () => void;
  loadingHistory: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  role,
  statusName,
  handleAction,
  handleHistory,
  handleBack,
  loadingHistory,
}) => {
  const [loading, setLoading] = useState<string | null>(null);

  const buttons: { label: string; statusCode?: string; onClick?: () => void }[] = [];

  if (role === "supervisor") {
    switch (statusName) {
      case "Em aprovação":
        buttons.push(
          { label: "Aprovar", statusCode: "#INCIDENT_PENDENT" },
          { label: "Finalizar", statusCode: "#INCIDENT_FINISHED" },
          { label: "Ação FV", statusCode: "#INCIDENT_PENDENT_FV" },
          { label: "Cancelar", statusCode: "#INCIDENT_CANCELED" }
        );
        break;
      case "Pendente":
        buttons.push(
          { label: "Finalizar", statusCode: "#INCIDENT_FINISHED" },
          { label: "Ação FV", statusCode: "#INCIDENT_PENDENT_FV" },
          { label: "Cancelar", statusCode: "#INCIDENT_CANCELED" }
        );
        break;
      case "Finalizado":
        buttons.push({ label: "Reabrir", statusCode: "#INCIDENT_PENDENT" });
        break;
      case "Pendente FV":
        buttons.push(
          { label: "Aprovar", statusCode: "#INCIDENT_IN_APPROVAL" },
          { label: "Cancelar", statusCode: "#INCIDENT_CANCELED" }
        );
        break;
    }
  } else {
    if (statusName === "Pendente FV") {
      buttons.push({ label: "Aprovar", statusCode: "#INCIDENT_IN_APPROVAL" });
    }
  }

  buttons.push({ label: "Histórico", onClick: handleHistory }, { label: "Voltar", onClick: handleBack });

  return (
    <div className="p-4 flex flex-wrap justify-center md:justify-start gap-2">
      {buttons.map(({ label, statusCode, onClick }) => (
        <Button
          key={label}
          onClick={async () => {
            setLoading(label);
            if (onClick) {
              await onClick();
            } else if (statusCode) {
              await handleAction(statusCode);
            }
            setLoading(null);
          }}
          variant="genericModalNo"
          disabled={loading === label}
          className="w-full md:w-auto"
        >
          {loading === label ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
