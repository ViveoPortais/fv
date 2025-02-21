'use client';

import { useState } from "react";
import { useModalContent } from "@/hooks/useModal";
import { Button } from "../../ui/button";
import { FaFilePdf, FaFileVideo, FaFileAudio } from "react-icons/fa";
import useSession from "@/hooks/useSession";
import { getBackgroundColor } from "@/helpers/helpers";

type FileItem = {
    icon: JSX.Element;
    link: string;
    name: string;
    type: 'pdf' | 'video' | 'audio';
};

interface ModalProps {
    files: FileItem[];
}

export function DocumentModal({ files }: ModalProps) {
    const { isModalOpen, openModal } = useModalContent((state) => ({
        isModalOpen: state.isModalOpen,
        openModal: state.openModal,
    }));

    const session = useSession();
    const bgColor = getBackgroundColor(session.programCode);

    const [currentVideo, setCurrentVideo] = useState<string | null>(null);
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);

    const renderFileContent = (file: FileItem) => {
        switch (file.type) {
            case 'pdf':
                return (
                    <Button
                        onClick={() => {
                            window.open(file.link, "_blank")
                            setCurrentVideo(null);
                        }}
                        className={`flex items-center justify-start p-4 text-left min-w-[560px] ${bgColor} text-white shadow-lg rounded-md hover:bg-gray-100`}
                    >
                        <div className="flex items-center">
                            {file.icon}
                            <span className="ml-3 truncate">{file.name}</span>
                        </div>
                    </Button>
                );
            case 'video':
                return (
                    <Button
                        onClick={() => {
                            setCurrentVideo(file.link);
                            openModal(true);
                        }}
                        className={`flex items-center justify-start p-4 text-left min-w-[560px] ${bgColor} text-white shadow-lg rounded-md hover:bg-gray-100`}
                    >
                        <div className="flex items-center">
                            {file.icon}
                            <span className="ml-3 truncate">{file.name}</span>
                        </div>
                    </Button>
                );
            case 'audio':
                return (
                    <Button
                        onClick={() => {
                            setCurrentAudio(file.link);
                            openModal(true);
                        }}
                        className={`flex items-center justify-start p-4 text-left min-w-[560px] ${bgColor} text-white shadow-lg rounded-md hover:bg-gray-100`}
                    >
                        <div className="flex items-center">
                            {file.icon}
                            <span className="ml-3 truncate">{file.name}</span>
                        </div>
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-[100%] sm:w-[100%] md:w-[60%] p-6 rounded-lg shadow-lg max-h-[80%] overflow-auto">
                        <div className="flex flex-col">
                            <h2 className="text-xl text-center font-semibold mb-4">Arquivos</h2>

                            <div className="grid grid-cols-1 gap-4 w-full justify-items-center">
                                {files.map((file, index) => (
                                    <div key={index} className="flex justify-center">
                                        {renderFileContent(file)}
                                    </div>
                                ))}
                            </div>

                            {currentVideo && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Assistir vídeo</h3>
                                    <video
                                        controls
                                        src={currentVideo}
                                        className="w-full h-auto rounded-md"
                                    />
                                </div>
                            )}

                            {currentAudio && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Ouvir áudio</h3>
                                    <audio
                                        controls
                                        src={currentAudio}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <Button
                                variant="tertiary"
                                onClick={() => openModal(false)}
                                className="mt-5 w-full bg-gray-300 hover:bg-gray-400 text-black"
                            >
                                Fechar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
