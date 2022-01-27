export interface AppState {
  isSidebarOpen: boolean,
  page: string,
}

type Action = {
  type: string,
  payload: any
}

const initialState = {
  isSidebarOpen : false,
  page: null
}

export const appReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      }
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload as string
      }
    default:
      return state
  }
}