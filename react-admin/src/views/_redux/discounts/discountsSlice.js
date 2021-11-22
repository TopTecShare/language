import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    listLoading: false,
    actionsLoading: false,

    discountsList: undefined,
    activityList: [],
    vendorList: [],
    platformList: [],
    error: '',
    errorEdit: '',
    delMsgStatus: null,
    discountData: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const discountsSlice = createSlice({
    name: "activities",
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

        catchErrorFetched: (state, action) => {
            state.errorEdit = `${action.type}: ${action.payload.error}`;
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

        statusFetched: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
        },

        getDiscountsDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.discountsList = action.payload.statusData;
            state.error = null;
        },

        getDiscountDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.discountData = action.payload.statusData;
            state.error = null;
        },

        setDiscountDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.discountData = null;
            state.error = null;
        },

        getActivityDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.activityList = action.payload.statusData;
            state.error = null;
        },

        getVendorDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorList = action.payload.statusData;
            state.error = null;
        },

        getPlatformDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.platformList = action.payload.statusData;
            state.error = null;
        },

    }
});
