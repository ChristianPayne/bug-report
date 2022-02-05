import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.css'
import { App } from './App'
import { Provider } from 'react-redux';
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="christianpayne.us.auth0.com"
      clientId="pTPZNy9GSwZCUz08FARrqeJn6FvKA3TC"
      redirectUri={window.location.origin + "/login"}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)