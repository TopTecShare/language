import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import Auth from "./reducers/Auth";
import Theme from "./reducers/Theme";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { usersSlice } from "../views/_redux/users/usersSlice";
import { projectSlice } from "../views/_redux/project/projectSlice";
import { unitSlice } from "../views/_redux/unit/unitSlice";
import { substitutionSlice } from "../views/_redux/substitution/substitutionSlice";
import { acronymSlice } from "../views/_redux/acronyms/acronymSlice";
import { workspaceSlice } from "../views/_redux/workspaces/workspaceSlice";

export const rootReducer = combineReducers({
  theme: Theme,
  auth: Auth,
  users: usersSlice.reducer,
  project: projectSlice.reducer,
  unit: unitSlice.reducer,
  substitution: substitutionSlice.reducer,
  acronym: acronymSlice.reducer,
  workspace: workspaceSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
