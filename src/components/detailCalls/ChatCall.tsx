import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChatMessages, sendMessage } from "@/store/slices/callChatSlice";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import useSession from "@/hooks/useSession";
import { LoadingOverlay } from "../custom/LoadingOverlay";

interface ChatCallProps {
  incidentId: string;
  programCode: string;
}

const ChatCall: React.FC<ChatCallProps> = ({ incidentId, programCode }) => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.callChat.chat);
  const loading = useAppSelector((state) => state.callChat.loading);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const userLogged = useSession().name;

  useEffect(() => {
    dispatch(fetchChatMessages({ incidentId, programCode }));
  }, [dispatch, incidentId, programCode]);

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return;
    let currentDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");

    try {
      const response = await dispatch(
        sendMessage({
          incidentId,
          healthProgramCode: programCode,
          message,
          attachmentFile: file!,
          hasAttachment: !!file,
          date: currentDate,
        })
      ).unwrap();

      if (response.isValidData) {
        dispatch(fetchChatMessages({ incidentId, programCode }));
        setMessage("");
        setFile(null);
      }
    } catch (error) {}
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    const allowedFormats = ["pdf", "jpeg", "png", "gif", "heic", "xlsx", "xls"];
    const fileExtension = uploadedFile?.name.split(".").pop()?.toLowerCase();

    if (
      uploadedFile &&
      uploadedFile.size <= 5 * 1024 * 1024 &&
      fileExtension &&
      allowedFormats.includes(fileExtension)
    ) {
      setFile(uploadedFile);
    } else {
      toast.error("Arquivo inválido. Verifique o tamanho e o formato suportado.");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4 w-full">
      <LoadingOverlay isVisible={loading} />
      <h2 className={`text-xl font-semibold text-gray-700`}>Histórico da Conversa</h2>
      <div className="flex-grow overflow-y-auto overflow-x-hidden border rounded-lg p-4">
        {chat.isValidData ? (
          chat.value.chatDialogs.map((dialog: any) => (
            <div
              key={dialog.id}
              className={`flex ${dialog.name === userLogged ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] p-3 rounded-lg ${
                  dialog.name === userLogged
                    ? "bg-blue-100 border border-blue-200"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <p className="text-sm font-semibold">{dialog.name}</p>
                <div
                  className="max-w-[10rem] xs:max-w-[15rem] sm:max-w-[20rem] md:max-w-[30rem] lg:max-w-[40rem] xl:max-w-[50rem] overflow-y-auto mb-2"
                  style={{ wordWrap: "break-word" }}
                >
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{dialog.message}</p>
                </div>
                <p className={`text-xs text-gray-500 text-right`}>
                  {new Date(dialog.date).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Esta conversa não possui mensagens a serem exibidas</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow w-full p-2 border rounded-lg resize-none h-24 sm:h-20 md:h-24 lg:h-28"
          rows={3}
        />
        <Button
          onClick={handleSendMessage}
          disabled={loading}
          variant={"genericModalNo"}
          className="flex items-center space-x-2"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <span className="text-xs text-gray-500">
        Você pode anexar um arquivo por mensagem. O arquivo não pode exceder 5MB e suportamos prints de dispositivos e
        os formatos PDF, JPEG, PNG, GIF, HEIC, XLSX e XLS.
      </span>

      <div className="flex items-center space-x-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Paperclip className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">Anexar Arquivo</span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        {file && <span className="text-xs text-gray-700">{file.name}</span>}
      </div>
    </div>
  );
};

export default ChatCall;
