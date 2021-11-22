import * as requestFromServer from "./unitCrud";
import { unitSlice, callTypes } from "./unitSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = unitSlice;

export const addUnit = (productForCreation) => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.addUnit(productForCreation).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};

export const getUnitLists = () => (dispatch) => {
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getUnitLists()
    .then(({ data }) => {
      dispatch(actions.unitListFetched({ data: data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find vendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateUnit = (data) => (dispatch) => {
  return requestFromServer.updateUnit(data);
};

export const deleteUnit = (id) => (dispatch) => {
  return requestFromServer.deleteUnit(id);
};

export const getUnitListsByProjectCode = (title) => (dispatch) => {
  return requestFromServer.getUnitListsByProjectCode(title).then(({ data }) => {
    dispatch(actions.unitListFetched({ data: data }));
  });
};
