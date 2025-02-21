import { DialogContent } from "../ui/dialog";

export function PasswordCorrect() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] backgroundModal border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold  text-white">
          Dados alterados com sucesso
        </span>
      </div>
    </DialogContent>
  );
}
