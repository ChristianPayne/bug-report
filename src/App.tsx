import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { Login } from "./Login";
import { LoginState } from './store/loginReducer';

type Props = { }

export const App: FC<Props> = () => {
  const loggedIn = useSelector<LoginState, LoginState["loggedIn"]>((state) => state.loggedIn)
  
  return (
    <div className='bg-zinc-900 text-zinc-100 h-screen font-mono'>
      {
        !loggedIn && <Login/>
      }
    </div>
  )
}