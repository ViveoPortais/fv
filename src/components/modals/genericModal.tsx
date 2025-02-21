'use client';

import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useModalGeneric } from "@/hooks/useModal";

const GenericModal = ({
    handleYes,
    handleNo,
    text,
    bgColor,
}: {
    handleYes?: () => void;
    handleNo?: (id?: string) => void;
    text?: string;
    bgColor: string;
}) => {
    const modal = useModalGeneric();

    const handleCloseModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.openModal(false);
        }
    };

    const handleNoClick = (event: React.MouseEvent) => {
        if (modal.handleNo) {
            modal.handleNo();
        }
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
                                {modal.text}
                            </h2>

                            <div className="flex justify-center gap-4 mt-4">
                                {modal.showOkButton ? (
                                    <Button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className={`${bgColor} w-full`}
                                    >
                                        Ok
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            type="button"
                                            onClick={modal.handleYes}
                                            className={`${bgColor} w-full sm:w-[48%]`}
                                        >
                                            Sim
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleNoClick}
                                            className="w-full sm:w-[48%]"
                                            variant="genericModalNo"
                                        >
                                            Não
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GenericModal;
