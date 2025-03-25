'use client';

import { alterPasswordProps, alterPasswordSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { FaTimes } from "react-icons/fa"; // Ícone de fechar
import { changePassword } from "@/services/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useModalAlterPassword } from "@/hooks/useModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useSession from "@/hooks/useSession";

export function AlterPasswordModal() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setObrigatorioAlterarSenha, obrigatorioAlterarSenha, primeiroAcesso } = useSession();
    const alterPasswordModal = useModalAlterPassword();
    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<alterPasswordProps>({
        resolver: zodResolver(alterPasswordSchema),
    });

    const onSubmit = async (data: alterPasswordProps) => {
        try {
            setIsLoading(true);
            const res = await changePassword(data);

            if (res.isValidData) {
                toast.success(res.value);
                if (obrigatorioAlterarSenha)
                    setObrigatorioAlterarSenha(false);

                alterPasswordModal.openModal(false);

                router.push("/dashboard/program");
            } else {
                alterPasswordModal.openModal(false);
                toast.warning(res.additionalMessage);
            }
        } catch (error) {
            toast.error("Erro ao tentar alterar senha");
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setValue("oldPassword", "");
        setValue("newPassword", "");
        setValue("confirmPassword", "");
        clearErrors();
    };

    const handleCloseModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            alterPasswordModal.openModal(false);
        }
    };

    return (
        <>
            {alterPasswordModal.isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleCloseModal}
                >
                    <div className="bg-white w-[90%] sm:w-[60%] md:w-[40%] p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={() => alterPasswordModal.openModal(false)}
                        >
                            <FaTimes size={20} />
                        </button>

                        <div className="flex flex-col">
                            <h2 className="text-xl text-center font-semibold mb-4">
                                Alterar Senha
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                                <Input
                                    type="password"
                                    placeholder="Senha antiga"
                                    {...register("oldPassword")}
                                    className="mt-1"
                                />
                                {errors.oldPassword && (
                                    <span className="text-red-500">{errors.oldPassword.message as string}</span>
                                )}

                                <Input
                                    type="password"
                                    placeholder="Nova senha"
                                    {...register("newPassword")}
                                    className="mt-1"
                                />
                                {errors.newPassword && (
                                    <span className="text-red-500">{errors.newPassword.message as string}</span>
                                )}

                                <Input
                                    type="password"
                                    placeholder="Confirmar nova senha"
                                    {...register("confirmPassword")}
                                    className="mt-1"
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500">{errors.confirmPassword.message as string}</span>
                                )}

                                <div className="flex gap-4 mt-4">
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-[48%]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <CgSpinner size={20} className="text-white animate-spin" />
                                        ) : (
                                            "Alterar Senha"
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={clearForm}
                                        className="w-full sm:w-[48%]"
                                        variant="tertiary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <CgSpinner size={20} className="text-white animate-spin" />
                                        ) : (
                                            "Limpar Campos"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
