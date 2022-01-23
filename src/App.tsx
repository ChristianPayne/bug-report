import React, { FC, useEffect } from 'react'
import { Login } from "./Login";
import { useSelector } from 'react-redux';
import { AuthState } from './store/authReducer';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Reports } from './Reports/Reports';
import { Dashboard } from './Dashboard/Dashboard';

type Props = { }

export const App: FC<Props> = () => {
  const loggedIn = useSelector<AuthState, AuthState["loggedIn"]>((state) => state.loggedIn)

  let navigate = useNavigate();

  useEffect(()=>{
    if(loggedIn === false) {
      console.log("Nav to login");
      navigate('/login', {replace: true})
    }
  },[loggedIn])

  return (
    <div className='bg-zinc-900 text-zinc-100 h-screen font-mono py-6 scrollbar overflow-y-scroll'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  )
}