import { configureStore } from "@reduxjs/toolkit";
import callTrackingReducer from "./slices/callTrackingSlice";
import callSlice from "./slices/callSlice";

export const store = configureStore({
  reducer: {
    callTracking: callTrackingReducer,
    call: callSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
