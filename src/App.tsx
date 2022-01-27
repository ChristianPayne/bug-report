import React, { FC, useEffect } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Pages
import { Login } from "./pages/Login";
import { Reports } from './pages/Reports';
import { NewReport } from './pages/NewReport';
import { Dashboard } from './pages/Dashboard';
import { Templates } from './pages/Templates';
import { Report } from './pages/Report';

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
        <Route path="/reports/new" element={<NewReport />} />
        <Route path="/reports/:id" element={<Report />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </div>
  )
}