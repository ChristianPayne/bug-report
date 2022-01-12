import { createStore } from "redux";
import { loginReducer } from "./loginReducer";

export const store = createStore(loginReducer)