import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { downloadAttachment, getChatDetails, postChat } from "@/services/chat";
import { PostChat } from "@/types/chat";
import { toast } from "react-toastify";

const initialState: any = {
  chat: { isValidData: false, value: { chatDialogs: [] } },
  loading: false,
  error: null,
};

export const fetchChatMessages = createAsyncThunk(
  "callChat/fetchChatMessages",
  async ({ incidentId, programCode }: { incidentId: string; programCode: string }, { rejectWithValue }) => {
    try {
      const response: any = await getChatDetails(incidentId, programCode);
      return response;
    } catch (error) {
      return rejectWithValue("Erro ao carregar mensagens do chat");
    }
  }
);

export const sendMessage = createAsyncThunk("callChat/sendMessage", async (data: PostChat, { rejectWithValue }) => {
  try {
    const response = await postChat(data);
    if (response.isValidData) {
      toast.success(response.additionalMessage);
    } else {
      toast.error(response.additionalMessage || "Erro ao enviar mensagem");
    }
    return response;
  } catch (error) {
    toast.error("Erro ao enviar mensagem");
    return rejectWithValue("Erro ao enviar mensagem");
  }
});

export const downloadAttachmentChat = createAsyncThunk(
  "callChat/downloadAttachment",
  async ({ incidentId, programCode }: { incidentId: string; programCode: string }, { rejectWithValue }) => {
    try {
      const response = await downloadAttachment(incidentId, programCode);

      const contentDisposition = response.headers["content-disposition"];
      let fileName = "anexo_desconhecido";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"|filename\*=(?:UTF-8'')?(.+)/);
        if (match) {
          fileName = match[1] || match[2];
          fileName = decodeURIComponent(fileName).replace(/['"]/g, "");
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (error) {
      toast.error("Erro ao baixar anexo.");
      return rejectWithValue("Erro ao baixar anexo");
    }
  }
);

const callChatSlice = createSlice({
  name: "callChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.chat = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadAttachmentChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadAttachmentChat.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadAttachmentChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default callChatSlice.reducer;
