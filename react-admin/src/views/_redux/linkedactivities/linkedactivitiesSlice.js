import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    listLoading: false,
    actionsLoading: false,

    linkedactivitiesList: undefined,
    activityList: [],
    vendorList: [],
    platformList: [],
    error: '',
    errorEdit: '',
    delMsgStatus: null,
    linkedactivityData: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const linkedactivitiesSlice = createSlice({
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
   
        getLinkedActivitiesDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.linkedactivitiesList = action.payload.statusData;
            state.error = null;
        },

        getLinkedActivityDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.linkedactivityData = action.payload.statusData;
            state.error = null;
        },

        setLinkedActivityDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.linkedactivityData = null;
            state.error = null;
        },

        getActivityDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.activityList = action.payload.statusData;
            state.error = null;
        },

    }
});
