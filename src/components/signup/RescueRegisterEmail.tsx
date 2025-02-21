import { DialogContent } from "../ui/dialog";

export function RescueRegisterEmail() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] backgroundModal border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold  text-white">
          Não foi possível realizar seu cadastro na área logada do programa de
          suporte ao diagnóstico, pois seu nome/CRM já está cadastrado em nosso
          programa.
        </span>
      </div>
    </DialogContent>
  );
}
