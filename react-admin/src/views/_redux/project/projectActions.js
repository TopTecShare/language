import * as requestFromServer from "./projectCrud";
import { projectSlice, callTypes } from "./projectSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = projectSlice;

export const addProject = (productForCreation) => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.addProject(productForCreation).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const getProjectLists = () => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getProjectLists()
    .then(({ data }) => {
      dispatch(actions.projectListFetched({ data: data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find vendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateProject = (data) => (dispatch) => {
  return requestFromServer.updateProject(data);
};

export const deleteProject = (id) => (dispatch) => {
  return requestFromServer.deleteProject(id);
};

// export const deleteUser = (id) => (dispatch) => {
//   return requestFromServer.deleteUser(id);
// };
