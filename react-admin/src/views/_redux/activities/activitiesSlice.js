import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    listLoading: false,
    actionsLoading: false,
    addActivityStatusData: null,
    addActivityStatus: 0,
    addActivityId: 0,
    setActivityId: 0,
    gallaryData: "",
    editStatus: 0,
    activityData: null,
    platformData: [],
    foodData: [],
    vendorData: 0,
    transportData: [],
    vendorsSlabData: [],
    amenitiesData: [],
    activityList: [],
    linkedActivityList: [],
    error: '',
    errorEdit: '',
    delMsgStatus: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const activitiesSlice = createSlice({
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
            state.editStatus = 1;
            state.addActivityStatusData = action.payload.statusData.msg;
            state.addActivityStatus = action.payload.statusData.success;
            state.addActivityId = action.payload.statusData.data.id;
            state.error = null;
        },

        getGalleryFetched: (state, action) => {
            state.actionsLoading = false;
            // state.gallaryData = action.payload.statusData.data.gallary;
            const tmp_data = action.payload.statusData.data;
            state.gallaryData = tmp_data.gallary.split(",");
            state.error = null;
        },

        getIdFetched: (state, action) => {
            state.actionsLoading = false;
            state.activityData = action.payload.statusData.data;
            state.addActivityId = action.payload.statusData.data.id;
            state.error = null;
        },

        getPlatformDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.platformData = action.payload.statusData;
            state.error = null;
        },

        getFoodDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.foodData = action.payload.statusData;
            state.error = null;
        },

        getTransportDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.transportData = action.payload.statusData;
            state.error = null;
        },

        getAmenitiesDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.amenitiesData = action.payload.statusData;
            state.error = null;
        },

        getActivitiesDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.activityList = action.payload.statusData;
            state.addActivityId = 0;
            state.error = null;
        },

        setActivityStatusData: (state) => {
            state.addActivityStatusData = null;
        },

        deleteImageFetched: (state, action) => {
            state.delMsgStatus = action.payload.statusData.msg;
        },

        setDelImgStatusData: (state) => {
            state.delMsgStatus = null;
        },

        getLinkedActivitiesDataFetched: (state, action) => {
            state.actionsLoading = false;
            state.linkedActivityList = action.payload.statusData;
            // state.addActivityId = 0;
            state.error = null;
        },

        getVendorFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorData = action.payload.statusData.data.our_commission;
            state.error = null;
        },

        getVendorsSlabFetched: (state, action) => {
            state.actionsLoading = false;
            state.vendorsSlabData = action.payload.statusData;
            state.error = null;
        },
    }
});
