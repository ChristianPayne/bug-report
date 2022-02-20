import { useAuth0 } from '@auth0/auth0-react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppState } from '../../store/appReducer'
import { RootState } from '../../store/store'

type Props = { }

export const Sidebar: FC<Props> = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let {isAuthenticated, logout, user} = useAuth0();
  let isSidebarOpen = useSelector<RootState, AppState["isSidebarOpen"]>((state)=> state.app.isSidebarOpen)

  function toggleSidebar () {
    dispatch({
      type: "TOGGLE_SIDEBAR"
    })
  }

  function linkClick (link: string) {
    toggleSidebar()
    navigate(link)
  }
  return (
    <>
      {/* Hidden close button */}
      <div className={`absolute z-10 inset-0 ${isSidebarOpen ? "" : "hidden"}`} onClick={toggleSidebar}></div>
      {/* Sidebar */}
      <div className={`absolute z-20 min-w-[240px] h-full min-h-full py-6 border-r-2 bg-zinc-900 transition ease-in-out ${isSidebarOpen ? "" : "-translate-x-full opacity-0"}`}>
        <div className="flex flex-col px-4 h-full text-center text-md">
          <button className="text-2xl font-montserrat mb-4" onClick={()=>linkClick("/reports")}>Bug Report</button>
          <button className="mb-2 p-2" onClick={()=>linkClick("/reports")}>Reports</button>
          <button className="mb-2 p-2" onClick={()=>linkClick("/templates")}>Templates</button>
          <button className="mb-2 button" onClick={()=>linkClick("/reports/new")}>New Report</button>
          <div className="grow"></div>
          {/* Log Out Button */}
          {isAuthenticated &&
          <button className='button' onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>}
          <p className="text-xs mt-2">Built by <a href="https://github.com/ChristianPayne" target="_blank">Christian Payne</a></p>
        </div>
      </div>
    </>
  )
}