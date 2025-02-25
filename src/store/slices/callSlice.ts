import { getDetails } from "@/services/incident";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { CallDetails } from "@/types/incident";

interface CallState {
  data: CallDetails | null;
  loading: boolean;
  selectedCallId: string | null;
  code: string | null;
  callStatusName: string | null;
}

const initialState: CallState = {
  data: null,
  loading: false,
  selectedCallId: null,
  code: null,
  callStatusName: null,
};

export const fetchCall = createAsyncThunk(
  "call/fetchCall",
  async ({ incidentId, programCode }: { incidentId: string; programCode: string }, { rejectWithValue }) => {
    try {
      const data = await getDetails(incidentId, programCode);
      return data;
    } catch (error: any) {
      toast.error(error.response?.data || "Erro ao buscar chamados");
      return rejectWithValue(error.response?.data || "Erro ao buscar chamados");
    }
  }
);

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setSelectedCallId(state, action: PayloadAction<string>) {
      state.selectedCallId = action.payload;
    },
    clearSelectedCallId(state) {
      state.selectedCallId = null;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    clearCode(state) {
      state.code = null;
    },
    setStatusName(state, action: PayloadAction<string>) {
      state.callStatusName = action.payload;
    },
    clearStatusName(state) {
      state.callStatusName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCall.fulfilled, (state, action: PayloadAction<CallDetails>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCall.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCallId, clearSelectedCallId, setCode, clearCode, setStatusName, clearStatusName } =
  callSlice.actions;

export const callDetails = (state: RootState) => state.call.data;
export const selectedCallId = (state: RootState) => state.call.selectedCallId;
export const loading = (state: RootState) => state.call.loading;
export const code = (state: RootState) => state.call.code;
export const callStatusName = (state: RootState) => state.call.callStatusName;

export default callSlice.reducer;
