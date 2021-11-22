import * as requestFromServer from "./substitutionCrud";
import { substitutionSlice, callTypes } from "./substitutionSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = substitutionSlice;

export const addSubstitution = (productForCreation) => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.addSubstitution(productForCreation).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const getSubstitutionLists = () => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getSubstitutionLists()
    .then(({ data }) => {
      dispatch(actions.substitutionListFetched({ data: data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find vendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateSubstitution = (data) => (dispatch) => {
  return requestFromServer.updateSubstitution(data);
};

export const deleteSubstitution = (id) => (dispatch) => {
  return requestFromServer.deleteSubstitution(id);
};

