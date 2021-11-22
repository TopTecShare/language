import * as requestFromServer from "./vendoramenitiesCrud";
import { vendoramenitiesSlice, callTypes } from "./vendoramenitiesSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = vendoramenitiesSlice;
export const getVendor = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendor()
        .then(({data}) => {
            dispatch(actions.getVendorFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't get vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const addVendorAmenitie = (vendorAmenitieData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addVendorAmenitie(vendorAmenitieData, token)
        .then(({data}) => {
            //dispatch(actions.getVendorFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't get vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorAmenities = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorAmenities()
        .then(({ data }) => {
            const mockUtils = new MockUtils();

            const carTableMock = data.data;
            const filteredProducts = mockUtils.baseFilter(carTableMock, queryParams);
            const { entities, totalCount } = filteredProducts;

            dispatch(actions.usersFetched({ totalCount, entities }));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}

export const getVendorAmenitieData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorAmenitieData(id, token)
        .then(({ data }) => {
            if (data.success) {
                delete data.data.created_at;
                delete data.data.updated_at;
                dispatch(actions.vendorAmenitieFetched({ vendorAmenitiesData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorAmenitieLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorAmenitieLists()
        .then(({ data }) => {
            dispatch(actions.vendorAmenitieListFetched({vendorAmenitieListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}

