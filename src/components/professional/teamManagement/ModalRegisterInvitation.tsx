'use client';

import { useState } from "react";
import { Button } from "../../ui/button";
import { useModalInvitationRegister } from "@/hooks/useModal";
import { emailRegex } from "@/helpers/helpers";
import { invitationDoctor } from "@/services/doctor";
import { toast } from "react-toastify";
import useSession from "@/hooks/useSession";

export function ModalRegisterInvitation() {
    const auth = useSession();
    const { isModalOpen, openModal } = useModalInvitationRegister((state) => ({
        isModalOpen: state.isModalOpen,
        openModal: state.openModal,
    }));

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState<string>("");

    const handleSubmit = async () => {
        if (!email || !emailRegex.test(email)) {
            setEmailError("Por favor, insira um e-mail válido.");
            return;
        }

        setIsLoading(true);
        setEmailError("");

        try {
            const response = await invitationDoctor(email, auth.programCode);
            if (response.isValidData) {
                toast.success(response.additionalMessage);
                openModal(false);
            } else {
                toast.error(response.additionalMessage);
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao enviar o convite.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-[90%] sm:w-[60%] md:w-[40%] p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col">
                            <h2 className="text-xl text-center font-semibold mb-4">
                                Informe o e-mail do médico
                            </h2>
                            <p className="text-center mb-6">
                                O médico que irá receber o convite para cadastro.
                            </p>

                            <div className="flex flex-col gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-mail do médico"
                                    className={`p-3 border ${emailError ? "border-red-500" : "border-gray-300"} rounded-md`}
                                />
                                {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                            </div>

                            <div className="flex gap-4 mt-4">
                                <Button
                                    onClick={handleSubmit}
                                    className="w-full sm:w-[48%]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Enviando..." : "Enviar convite"}
                                </Button>

                                <Button
                                    variant="tertiary"
                                    onClick={() => openModal(false)}
                                    className="w-full sm:w-[48%]"
                                >
                                    Fechar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
