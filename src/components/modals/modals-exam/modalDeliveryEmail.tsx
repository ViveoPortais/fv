'use client';

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useModalDeliveryEmail } from "@/hooks/useModal";

const ModalDeliveryEmail = ({ setValue, email, setEmailRegistered, isDoctor, emailBound }: { setValue: any, email: string, setEmailRegistered: (value: boolean) => void, emailBound: string; isDoctor: boolean }) => {
    const modal = useModalDeliveryEmail();

    const handleCloseModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.openModal(false);
        }
    };

    const handleUseEmail = () => {
        setValue('emailAddressCaregiver', isDoctor ? email : emailBound);
        setEmailRegistered(true);
        modal.openModal(false);
    };

    const handleEnterEmail = () => {
        setValue('emailAddressCaregiver', '');
        setEmailRegistered(false);
        modal.openModal(false);
    };

    return (
        <>
            {modal.isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleCloseModal}
                >
                    <div className="bg-white w-[90%] sm:w-[60%] md:w-[40%] p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={() => modal.openModal(false)}
                        >
                            <FaTimes size={20} />
                        </button>

                        <div className="flex flex-col text-center">
                            <h2 className="text-xl font-semibold mb-4">
                                Deseja utilizar o e-mail cadastrado?
                            </h2>

                            <div className="flex justify-center gap-4 mt-4">
                                <Button
                                    type="button"
                                    onClick={handleUseEmail}
                                    className="w-full sm:w-[48%]"
                                >
                                    Sim
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleEnterEmail}
                                    className="w-full sm:w-[48%]"
                                    variant="tertiary"
                                >
                                    Não
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalDeliveryEmail;
