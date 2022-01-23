import { combineReducers, createStore } from "redux";
import { authReducer, AuthState } from "./authReducer";
import { reportReducer, ReportState } from "./reportReducer";

export type RootState = {
  auth: AuthState,
  reports: ReportState
}

let rootReducer = combineReducers({
  auth: authReducer,
  reports: reportReducer
})

export const store = createStore(rootReducer)