import * as requestFromServer from "./activitiesCrud";
import { activitiesSlice, callTypes } from "./activitiesSlice";

const { actions } = activitiesSlice;
export const addActivity = (addActivityData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addActivity(addActivityData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const editActivity = (editActivityData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .editActivity(editActivityData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't edit activity";
            dispatch(actions.catchErrorFetched({ error, callType: callTypes.action }));
        });
};

export const uploadGallery = (uploadData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .uploadGallery(uploadData, token)
        .then(({ data }) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getGallery = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getGallery(id, token)
        .then(({ data }) => {
            dispatch(actions.getGalleryFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getIdData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getIdData(id, token)
        .then(({ data }) => {
            dispatch(actions.getIdFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const deleteImage = (id, img, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteImage(id, img, token)
        .then(({ data }) => {
            dispatch(actions.deleteImageFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getPlatformData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getPlatformData(token)
        .then(({ data }) => {
            if (data.success) {
                for(var i = 0; i< data.data.length; i++)
                {
                    delete data.data[i].url;
                    delete data.data[i].image;
                    delete data.data[i].default_percentage;
                    delete data.data[i].enable;
                    delete data.data[i].allowed_users;
                    delete data.data[i].created_at;
                    delete data.data[i].updated_at;
                }
                
                dispatch(actions.getPlatformDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getFoodData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getFoodData(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getFoodDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getTransportData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getTransportData(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getTransportDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getAmenitiesData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getAmenitiesData(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getAmenitiesDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getActivitylist = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getActivitylist(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.getActivitiesDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const setActivityStatusData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getActivitylist(token)
        .then(({ data }) => {
            dispatch(actions.setActivityStatusData({ }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });      
        
};

export const setDelImgStatusData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getActivitylist(token)
        .then(({ data }) => {
            dispatch(actions.setDelImgStatusData({ }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });      
        
};

export const getLinkedActivities = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getLinkedActivities(token)
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

export const getVendorData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorData(id, token)
        .then(({ data }) => {
            dispatch(actions.getVendorFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorsSlabData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorsSlabData(token)
        .then(({ data }) => {
            dispatch(actions.getVendorsSlabFetched({ statusData: data.data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};