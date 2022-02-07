import { Report } from "../lib/types";
export interface ReportState {
  reports: Array<Report>
  reportsLoaded: boolean
}

type Action = {
  type: string,
  payload: any
}

const initialState = {
  reports: [],
  reportsLoaded: false
}

export const reportReducer = (state: ReportState = initialState, action: Action) => {
  switch (action.type) {
    case "REPORTS_LOADED":
      return {
        ...state,
        reportsLoaded: action.payload,
      }
    case "ADD_REPORT":
      console.log("ADD_REPORT: ", action.payload);
      return {
        reports: [...state.reports, action.payload]
      }
    case "ADD_REPORTS":
      return {
        reports: [...state.reports, ...action.payload]
      }
    case "REPLACE_REPORT":
      return {
        reports: state.reports.map((report)=>{
          if(report.id === action.payload.id) {
            return action.payload
          } else {
            return report
          }
        })
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