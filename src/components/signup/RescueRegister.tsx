import { DialogContent } from "../ui/dialog";

export function RescueRegister() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] backgroundModal border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold text-white">
          Não foi possível realizar seu cadastro na área logada do programa de
          suporte ao diagnóstico, pois seu nome/CRM não constam na base do
          Programa Vida Rara da Daiichi Sankyo.
        </span>
        <span className="text-xl mt-5 font-semibold text-white">
          Caso deseje fazer parte, por favor entre em contato com o SAC- Serviço
          de Atendimento ao Cliente da Daiichi Sankyo, através do telefone 0800
          055 65 96 ou e-mail{" "}
          <a
            href="https://daiichisankyo.com.br/fale-conosco/"
            className="underline"
            target="_blank"
          >
            sac@dsbr.com.br
          </a>{" "}
          , para solicitar o cadastramento e receber a validação para acesso ao
          programa.
        </span>
      </div>
    </DialogContent>
  );
}
