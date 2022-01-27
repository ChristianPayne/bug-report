import { combineReducers, createStore } from "redux";
import { reportReducer, ReportState } from "./reportReducer";

export type RootState = {
  reports: ReportState
}

let rootReducer = combineReducers({
  reports: reportReducer
})

export const store = createStore(rootReducer)