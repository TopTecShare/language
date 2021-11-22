import * as requestFromServer from "./acronymCrud";
import { acronymSlice, callTypes } from "./acronymSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = acronymSlice;

export const addAcronym = (productForCreation) => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.addAcronym(productForCreation).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const getAcronymLists = () => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAcronymLists()
    .then(({ data }) => {
      dispatch(actions.acronymListFetched({ data: data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find vendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateAcronym = (data) => (dispatch) => {
  return requestFromServer.updateAcronym(data);
};

export const deleteAcronym = (id) => (dispatch) => {
  return requestFromServer.deleteAcronym(id);
};

