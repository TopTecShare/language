import * as requestFromServer from "./vendorsslabCrud";
import { vendorsSlabSlice, callTypes } from "./vendorsslabSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = vendorsSlabSlice;

export const addVendorsSlab = (addVendorData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addVendorsSlab(addVendorData, token)
        .then(({data}) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorsSlab = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorsSlab()
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

export const getVendorsSlabData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorsSlabData(id, token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.vendorFetched({ vendorsSlabData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorsSlabLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorsSlabLists()
        .then(({ data }) => {
            dispatch(actions.vendorListFetched({vendorsSlabListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}
