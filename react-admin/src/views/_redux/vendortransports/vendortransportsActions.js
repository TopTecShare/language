import * as requestFromServer from "./vendortransportsCrud";
import { vendortransportsSlice, callTypes } from "./vendortransportsSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = vendortransportsSlice;
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

export const addVendorTransport = (vendorTransportData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addVendorTransport(vendorTransportData, token)
        .then(({data}) => {
            //dispatch(actions.getVendorFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't get vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorTransports = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorTransports()
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

export const getVendorTransportData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorTransportData(id, token)
        .then(({ data }) => {
            if (data.success) {
                delete data.data.created_at;
                delete data.data.updated_at;
                dispatch(actions.vendorTransportFetched({ vendorTransportsData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorTransportLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorTransportLists()
        .then(({ data }) => {
            dispatch(actions.vendorTransportListFetched({vendorTransportListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}

