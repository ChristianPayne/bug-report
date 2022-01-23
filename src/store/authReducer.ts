export interface AuthState {
  id: string | null,
  loggedIn: boolean
}

type Action = {
  type: string,
  payload: any
}

const initialState = {
  id: null,
  loggedIn : false
}

export const authReducer = (state: AuthState = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, loggedIn: action.payload
      }
    case "SET_ID":
      return {
        ...state, id: action.payload
      }
    default:
      return state
  }
}