import * as requestFromServer from "./discountsCrud";
import { discountsSlice, callTypes } from "./discountsSlice";

const { actions } = discountsSlice;
export const addDiscount = (addDiscountData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addDiscount(addDiscountData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const editDiscount = (editActivityData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .editDiscount(editActivityData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't edit activity";
            dispatch(actions.catchErrorFetched({ error, callType: callTypes.action }));
        });
};

export const getDiscountslist = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getDiscountslist()
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getDiscountsDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getActivityList = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getActivityList(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getActivityDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorList = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorList(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getVendorDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getPlatformList = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getPlatformList(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getPlatformDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getDiscountData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getDiscountData(id, token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getDiscountDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const setDiscountData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getDiscountslist(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.setDiscountDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
