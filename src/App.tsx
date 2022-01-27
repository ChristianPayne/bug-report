import React, { FC, useEffect } from 'react'
import { Login } from "./pages/Login";
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Reports } from './pages/Reports';
import { Dashboard } from './pages/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';

type Props = { }

export const App: FC<Props> = () => {
  let {isLoading, isAuthenticated, user} = useAuth0()
  let navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading) {
      if(isAuthenticated === false) {
        console.error("Authentication error, redirecting...");
        navigate('/login', {replace: true})
      } else {
        console.log(`Authenticated as ${user.nickname}`);
      }
    }
  },[isLoading])

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