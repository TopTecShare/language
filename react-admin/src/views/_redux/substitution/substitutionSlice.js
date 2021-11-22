import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  listLoading: false,
  actionsLoading: false,
  substitutionListData: [],
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const substitutionSlice = createSlice({
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

    substitutionListFetched: (state, action) => {
      state.actionsLoading = false;
      state.substitutionListData = action.payload.data;
      state.error = null;
    },
  },
});
