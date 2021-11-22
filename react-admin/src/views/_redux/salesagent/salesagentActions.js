import * as requestFromServer from "./salesagentCrud";
import { salesAgentSlice, callTypes } from "./salesagentSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = salesAgentSlice;

export const addSalesAgent = (salesAgentData, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addSalesAgent(salesAgentData, token)
        .then(({data}) => {
            dispatch(actions.statusFetched({ statusData: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't create vendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getSalesAgents = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getSalesAgents()
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

export const getSalesAgentData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getSalesAgentData(id, token)
        .then(({ data }) => {
            if (data.success) {
                delete data.data.password;
                delete data.data.password_reset_key;
                dispatch(actions.salesAgentFetched({ salesAgentData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find Sales agent";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getSalesAgentLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getSalesAgentLists()
        .then(({ data }) => {
            dispatch(actions.salesAgentListFetched({salesAgentListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}
