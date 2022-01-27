import React, { FC, useEffect, useState } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
  let [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  function toggleSidebar () {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='bg-zinc-900 text-zinc-100 h-screen font-mono py-6 scrollbar overflow-y-scroll'>
      <div className="flex h-full">
        <div className={`fixed min-w-[240px] min-h-full border-r-2 bg-zinc-900 transition ease-in-out ${isSidebarOpen ? "" : "-translate-x-full"}`}>
          <button className="translate-x-[256px] button" onClick={toggleSidebar}>{isSidebarOpen ? <>&lt;&lt;&lt;</> : <>&gt;&gt;&gt;</>}</button>
          <SideBar />
        </div>
        <div className=" flex-grow">
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
  )
}