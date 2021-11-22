import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    listLoading: false,
    actionsLoading: false,
    vendorMealsData: undefined,
    vendorData: undefined,
    totalCount: 0,
    entities: null,
    vendorMealListData: undefined,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const vendormealsSlice = createSlice({
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
 
        statusFetched: (state, action) => {
            state.actionsLoading = false;
            state.addActivityStatusData = action.payload.statusData.msg;
            state.addActivityStatus = action.payload.statusData.success;
            state.addActivityId = action.payload.statusData.data.id;
            state.error = null;
        },

        usersFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },

        getVendorFetched: (state, action) => {
            state.vendorData = action.payload.statusData.data;
            state.error = null;
        },

        vendorMealFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorMealsData = action.payload.vendorMealsData;
            state.error = null;
        },
        vendorMealListFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorMealListData = action.payload.vendorMealListData;
            state.error = null;
        },
    }
});
