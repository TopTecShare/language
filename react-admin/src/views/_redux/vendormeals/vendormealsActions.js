import * as requestFromServer from "./vendormealsCrud";
import { vendormealsSlice, callTypes } from "./vendormealsSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = vendormealsSlice;
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

export const addVendorMeal = (vendorMealData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addVendorMeal(vendorMealData, token)
        .then(({data}) => {
            //dispatch(actions.getVendorFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't get vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorMeals = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorMeals()
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

export const getVendorMealData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getVendorMealData(id, token)
        .then(({ data }) => {
            if (data.success) {
                delete data.data.created_at;
                delete data.data.updated_at;
                dispatch(actions.vendorMealFetched({ vendorMealsData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getVendorMealLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getVendorMealLists()
        .then(({ data }) => {
            dispatch(actions.vendorMealListFetched({vendorMealListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}

