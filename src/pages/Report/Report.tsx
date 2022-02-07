import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'
import { getReportById, getAllReportsByUserId } from "../../lib/bug-report-database";
import * as types from '../../lib/types'

type Props = { }

export const Report: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)
  let reportsLoaded = useSelector<RootState, ReportState["reportsLoaded"]>((state) => state.reports.reportsLoaded)
  let [isLoading, setIsLoading] = useState(true)
  let { user } = useAuth0();
  let { id } = useParams()
  let report: types.Report;

  async function loadReport () {
    report = reports.find(report => report.id === id)
    // console.log("Loaded Report: ", report);
  }

  useEffect(()=>{
    // Get the report
    if(reportsLoaded == false && user) {
      getAllReportsByUserId(user?.sub).then(reports => {
        // console.log("Loaded All Reports", reports);
        dispatch({
          type: "ADD_REPORTS",
          payload: reports
        })
      });
    }
  },[user])

  useEffect(()=>{
    loadReport();
  },[reports]);
  
  return (
    <>
      <Title title={report ? report.name : "Report"}/>
      {report}
    </>
  )
}