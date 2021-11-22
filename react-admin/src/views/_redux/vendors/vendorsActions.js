import * as requestFromServer from "./vendorsCrud";
import { vendorsSlice, callTypes } from "./vendorsSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = vendorsSlice;

export const addVendor = (addVendorData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addVendor(addVendorData, token)
        .then(({data}) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendors = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendors()
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

export const getVendorData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorData(id, token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.vendorFetched({ vendorData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorLists()
        .then(({ data }) => {
            dispatch(actions.vendorListFetched({vendorListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}
