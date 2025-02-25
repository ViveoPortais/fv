import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getIncidentAudit, getIncidentList, getMessagesCount, requestStatusIncident } from "@/services/incident";
import { Filters, RequestStatusIncident } from "@/types/incident";
import { RootState } from "../store";
import { IStringMapData } from "@/types";
import { getOptionsOpeningCalls } from "@/services/openingcalls";
import { toast } from "react-toastify";

interface CallTrackingState {
  calls: any[];
  statusOptions: { id: string; value: string }[];
  loading: boolean;
  error: string | null;
  messageCount: any;
  incidentAudit: any;
}

const initialState: CallTrackingState = {
  calls: [],
  statusOptions: [],
  loading: false,
  error: null,
  messageCount: null,
  incidentAudit: null,
};

export const fetchCalls = createAsyncThunk(
  "callTracking/fetchCalls",
  async ({ filters, programCode }: { filters: Filters; programCode: string }, { rejectWithValue }) => {
    try {
      const data = await getIncidentList(filters, programCode);
      return data;
    } catch (error: any) {
      toast.error(error.response?.data || "Erro ao buscar chamados");
      return rejectWithValue(error.response?.data || "Erro ao buscar chamados");
    }
  }
);

export const fetchStatusOptions = createAsyncThunk(
  "callTracking/fetchStatusOptions",
  async (data: IStringMapData, { rejectWithValue }) => {
    try {
      const response = await getOptionsOpeningCalls(data);
      return response
        .map((item: any) => ({ id: item.stringMapId, value: item.optionName }))
        .sort((a: any, b: any) => a.value.localeCompare(b.value));
    } catch (error: any) {
      toast.error(error.response?.data || "Erro ao buscar opções de status");
      return rejectWithValue(error.response?.data || "Erro ao buscar opções de status");
    }
  }
);

export const fetchApproveDisapprove = createAsyncThunk(
  "callTracking/fetchApproveDisapprove",
  async (data: RequestStatusIncident, { dispatch, rejectWithValue }) => {
    try {
      const res = await requestStatusIncident(data);
      if (res.isValidData) {
        toast.success(res.additionalMessage);
        dispatch(
          fetchCalls({
            filters: { code: "", startDate: "", endDate: "", statusStringMapId: "" },
            programCode: data.programCode!,
          })
        );
      } else toast.warning(res.additionalMessage);
    } catch (error: any) {
      toast.error(error.response?.data || "Erro ao aprovar ou cancelar chamado");
      return rejectWithValue(error.response?.data || "Erro ao aprovar ou cancelar chamado");
    }
  }
);

export const fetchGetMessagesCount = createAsyncThunk(
  "callTracking/fetchGetMessagesCount",
  async (programCode: string, { rejectWithValue }) => {
    try {
      return await getMessagesCount(programCode);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erro ao buscar contagem de mensagens");
    }
  }
);

export const fetchGetIncidentAudit = createAsyncThunk(
  "callTracking/fetchGetIncidentAudit",
  async ({ incidentId, programCode }: { incidentId: string; programCode: string }, { rejectWithValue }) => {
    try {
      return await getIncidentAudit(incidentId, programCode);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erro ao buscar auditoria de chamado");
    }
  }
)

const callTrackingSlice = createSlice({
  name: "callTracking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.calls = action.payload.data;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStatusOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatusOptions.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.statusOptions = action.payload;
      })
      .addCase(fetchStatusOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApproveDisapprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApproveDisapprove.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchApproveDisapprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGetMessagesCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetMessagesCount.fulfilled, (state, action: PayloadAction<any>) => {
        state.messageCount = action.payload;
        state.loading = false;
      })
      .addCase(fetchGetMessagesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGetIncidentAudit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetIncidentAudit.fulfilled, (state, action: PayloadAction<any>) => {
        state.incidentAudit = action.payload;
        state.loading = false;
      })
      .addCase(fetchGetIncidentAudit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCalls = (state: RootState) => state.callTracking.calls;
export const selectLoading = (state: RootState) => state.callTracking.loading;
export const selectStatusOptions = (state: RootState) => state.callTracking.statusOptions;
export const selectMessageCount = (state: RootState) => state.callTracking.messageCount;
export const selectIncidentAudit = (state: RootState) => state.callTracking.incidentAudit;

export default callTrackingSlice.reducer;
