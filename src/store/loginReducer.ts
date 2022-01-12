export interface LoginState {
  loggedIn: boolean
}

const initialState = {
  loggedIn : false
}

type Action = {
  type: "LOGIN",
  payload: boolean
}

export const loginReducer = (state:LoginState = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, loggedIn: action.payload
      }
    default:
      return state
  }
}