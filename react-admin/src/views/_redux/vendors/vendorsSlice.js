import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    vendorData: undefined,
    vendorListData: undefined,
    statusData: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const vendorsSlice = createSlice({
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
        vendorFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorData = action.payload.vendorData;
            state.error = null;
        },
        statusFetched: (state, action) => {
            state.actionsLoading = false;
            state.statusData = action.payload.statusData;
            state.error = null;
        },
        vendorListFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorListData = action.payload.vendorListData;
            state.error = null;
        },
    }
});
