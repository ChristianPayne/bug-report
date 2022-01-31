export interface ReportState {
  reports: Array<Report>
}

type ReportFields = {
  id: string,
  type: string,
  name: string,
  value: string
}

type Report = {
  id: string,
  userId: string,
  date: Date,
  name: string,
  fields: Array<ReportFields>
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
    default:
      return state
  }
}