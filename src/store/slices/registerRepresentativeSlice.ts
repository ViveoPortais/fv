import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IRegisterRepresentative } from "@/types/user";
import { registerRepresentative } from "@/services/user";

export const addRepresentative = createAsyncThunk(
  "registerRepresentative/addRepresentative",
  async (data: IRegisterRepresentative, { rejectWithValue }) => {
    try {
      const response = await registerRepresentative(data);
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
  }
);

const registerRepresentativeSlice = createSlice({
  name: "registerRepresentative",
  initialState: { loading: false, error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRepresentative.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRepresentative.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRepresentative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerRepresentativeSlice.reducer;
