"use client";

import { useAcceptTerms } from "@/hooks/useTerms";

import { Button } from "../ui/button";
import { PatientTerms } from "./PatientTerms";
import { DiagnosticTerms } from "./DiagnosticTerms";
import { TreatmentTerms } from "./TreatmentTerms";
import { DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface TermsProps {
  type: string;
  pdfUrl?: string;
}

export function TermsModal({ type, pdfUrl }: TermsProps) {
  const termsModal = useAcceptTerms();

  function acceptTerm(termType: string) {
    switch (termType) {
      case "patient":
        termsModal.acceptPatientTerms(true);
        break;
      case "diagnostic":
        termsModal.acceptMedicDiagnosticTerms(true);
        break;
      case "treatment":
        termsModal.acceptMedicTreatmentTerms(true);
        break;
      case "regulation":
        termsModal.acceptRegulation(true);
    }
    termsModal.openTermModal(false);
  }

  function rejectTerm(termType: string) {
    switch (termType) {
      case "patient":
        termsModal.acceptPatientTerms(false);
        break;
      case "diagnostic":
        termsModal.acceptMedicDiagnosticTerms(false);
        break;
      case "treatment":
        termsModal.acceptMedicTreatmentTerms(false);
        break;
      case "regulation":
        termsModal.acceptRegulation(false);
    }
    termsModal.openTermModal(false);
  }

  return (
    <DialogContent className="w-full rounded-lg lg:max-w-[80vw]">
      <ScrollArea className="h-[70vh]">
        <div className="px-4 lg:px-8">
          {pdfUrl ? (
            <div className="relative w-full h-[80vh]">
              <iframe
                src={pdfUrl}
                className="absolute top-0 left-0 w-full h-full border-none"
                title="Visualização Regulamento"
              />
            </div>
          ) : (
            <>
              {type === "patient" && <PatientTerms />}
              {type === "diagnostic" && <DiagnosticTerms />}
              {type === "treatment" && <TreatmentTerms />}
            </>
          )}
          <div className={pdfUrl != "" ? "absolute bottom-0 left-0 right-0 p-4 pl-10 pr-14 flex justify-between" : "flex flex-col gap-4 lg:flex-row lg:justify-between my-10"}>
            <Button
              className={pdfUrl != "" ? "w-60" : "w-80"}
              variant={`tertiary`}
              onClick={() => rejectTerm(type)}
            >
              Rejeitar
            </Button>
            <Button
              className={pdfUrl != "" ? "w-60" : "w-80"}
              variant={`default`}
              onClick={() => acceptTerm(type)}
            >
              Aceitar
            </Button>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
