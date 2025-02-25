import { configureStore } from "@reduxjs/toolkit";
import callTrackingReducer from "./slices/callTrackingSlice";
import callSlice from "./slices/callSlice";
import callChatSlice from "./slices/callChatSlice";
import registerRepresentativeSlice from "./slices/registerRepresentativeSlice";

export const store = configureStore({
  reducer: {
    callTracking: callTrackingReducer,
    call: callSlice,
    callChat: callChatSlice,
    registerRepresentative: registerRepresentativeSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
