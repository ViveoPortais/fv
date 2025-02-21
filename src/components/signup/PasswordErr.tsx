import { DialogContent } from "../ui/dialog";

export function PasswordErr() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] backgroundModal border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold text-white">
          Erro ao mudar seus dados
        </span>
      </div>
    </DialogContent>
  );
}
