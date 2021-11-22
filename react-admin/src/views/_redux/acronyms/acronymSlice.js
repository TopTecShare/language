import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  listLoading: false,
  actionsLoading: false,
  acronymListData: [],
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const acronymSlice = createSlice({
  name: "clients",
  initialState: initialProductsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    stopCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },

    acronymListFetched: (state, action) => {
      state.actionsLoading = false;
      state.acronymListData = action.payload.data;
      state.error = null;
    },
  },
});
