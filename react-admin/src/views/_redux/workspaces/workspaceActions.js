import * as requestFromServer from "./worksCrud";
import { workspaceSlice, callTypes } from "./workspaceSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = workspaceSlice;

export const addWorkspace = (productForCreation) => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.addWorkspace(productForCreation).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const getWorkspaceLists = () => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getWorkspaceLists()
    .then(({ data }) => {
      dispatch(actions.workspaceListFetched({ data: data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find vendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateWorkspace = (data) => (dispatch) => {
  return requestFromServer.updateWorkspace(data);
};

export const deleteWorkspace = (id) => (dispatch) => {
  return requestFromServer.deleteWorkspace(id);
};

