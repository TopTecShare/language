import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userData: undefined,
  statusData: null,
  userListData: undefined,
  customerListData: undefined,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const usersSlice = createSlice({
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
    usersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userData = action.payload.userData;
      state.error = null;
    },
    statusFetched: (state, action) => {
      state.actionsLoading = false;
      state.statusData = action.payload.statusData;
      state.error = null;
    },
    userListFetched: (state, action) => {
      state.actionsLoading = false;
      state.userListData = action.payload.userListData;
      state.error = null;
    },
    setUserDataFetched: (state, action) => {
      state.actionsLoading = false;
      state.userData = null;
      state.userListData = null;
      state.error = null;
    },

    addedUserFetched: (state, action) => {
      state.userListData = action.payload.userData;
    },

    updateUserFetched: (state, action) => {
      let objIndex = state.userListData.findIndex(
        (obj) => obj._id == action.payload.userListData.id
      );
      state.userListData[objIndex] = action.payload.userListData;
    },

    customerListData: (state, action) => {
      state.customerListData = action.payload.data;
    },

    customerListAdded: (state, action) => {
      state.customerListData = [...state.customerListData, action.payload.data];
    },
  },
});
