import * as requestFromServer from "./linkedactivitiesCrud";
import { linkedactivitiesSlice, callTypes } from "./linkedactivitiesSlice";

const { actions } = linkedactivitiesSlice;
export const addLinkedActivities = (addLinkedActivitiesData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addLinkedActivities(addLinkedActivitiesData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const editLinkedActivities = (editActivityData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .editLinkedActivities(editActivityData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't edit activity";
            dispatch(actions.catchErrorFetched({ error, callType: callTypes.action }));
        });
};

export const getLinkedActivitieslist = (token) => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getLinkedActivitieslist(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getLinkedActivitiesDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getLinkedActivityData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getLinkedActivityData(id, token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getLinkedActivityDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const setLinkedActivityData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getLinkedActivitieslist(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.setLinkedActivityDataFetched({ statusData: data.data }));
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