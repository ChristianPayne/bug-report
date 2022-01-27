import { combineReducers, createStore } from "redux";
import { reportReducer, ReportState } from "./reportReducer";
import { appReducer, AppState } from "./appReducer";

export type RootState = {
  reports: ReportState,
  app: AppState
}

let rootReducer = combineReducers({
  app: appReducer,
  reports: reportReducer,
})

export const store = createStore(rootReducer)