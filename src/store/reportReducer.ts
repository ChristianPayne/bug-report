import { Report } from "../lib/types";
export interface ReportState {
  reports: Array<Report>
}

type Action = {
  type: string,
  payload: any
}

const initialState = {
  reports: []
}

export const reportReducer = (state: ReportState = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_REPORT":
      console.log("ADD_REPORT: ", action.payload);
      return {
        reports: [...state.reports, action.payload]
      }
    case "ADD_REPORTS":
      return {
        reports: [...state.reports, ...action.payload]
      }
    case "CLEAR_REPORTS":
      return {
        reports: []
      }
    case "DELETE_REPORT":
      return {
        reports: state.reports.filter(report => report.id !== action.payload.id)
      }
    default:
      return state
  }
}