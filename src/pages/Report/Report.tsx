import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

type Props = { }

export const Report: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let {isAuthenticated, logout, user} = useAuth0();
  let { id } = useParams()

  const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)

  console.log(reports);

  function loadReport (report) {
    // Try to find 
    return {}
  }
  

  useEffect(()=>{
    // Get the report

  },[])
  
  return (
    <>
      <Title title="Report"/>
    </>
  )
}