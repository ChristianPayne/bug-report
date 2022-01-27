import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

type Props = { }

export const SideBar: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let {isAuthenticated, logout, user} = useAuth0();

  const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)
  
  return (
    <div className="flex flex-col px-4 min-h-full text-center">
      <h1 className="text-2xl font-montserrat mb-4">Bug Report</h1>
      <Link className="mb-2" to={'/reports'}>Reports</Link>
      <Link className="mb-2" to={'/templates'}>Templates</Link>
      <div className="grow"></div>
      {/* Log Out Button */}
      {isAuthenticated &&
      <button className='button' onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>}
      <p className="text-xs mt-2">Designed by <a href="https://github.com/ChristianPayne">Christian Payne</a></p>
    </div>
  )
}