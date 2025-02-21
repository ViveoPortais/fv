import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";

type ConfirmationDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
};

export const ConfirmationDialog = ({ open, onClose, onConfirm, userName }: ConfirmationDialogProps) => (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger asChild>
            <div></div>
        </DialogTrigger>
        <DialogContent className="mt-4">
            <DialogTitle className="text-lg md:text-2xl font-semibold">
                Atenção
            </DialogTitle>
            <p className="my-2 md:my-4">
                Olá usuário {userName}, você está realizando alterações em seus dados, deseja prosseguir?
            </p>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button onClick={onConfirm}>Confirmar</Button>
                <DialogClose asChild>
                    <Button type="button" variant="tertiary" onClick={onClose}>Cancelar</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);