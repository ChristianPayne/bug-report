import React, { FC, useEffect, useState } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { AppState, useAuth0 } from '@auth0/auth0-react';

// Components
import { Title } from "./components/Title";
import { SideBar } from "./components/SideBar";

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
  // let isSidebarOpen = useSelector<RootState, AppState["isSidebarOpen"]>((state)=> state.app.isSidebarOpen)

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
    <div className='bg-zinc-900 text-zinc-100 h-screen font-mono overflow-y-scroll'>
      {isAuthenticated && <SideBar />}
      <div className="p-6 scrollbar h-full">
        <div className="flex h-full relative">
          <div className="grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/new" element={<NewReport />} />
              <Route path="/reports/:id" element={<Report />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}