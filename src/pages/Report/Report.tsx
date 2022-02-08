import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'
import { getReportById, getAllReportsByUserId, updateReport } from "../../lib/bug-report-database";
import * as types from '../../lib/types'
import { FieldsReadWrite } from '../../components/FieldsReadWrite'
import { PencilIcon, XIcon } from '@heroicons/react/solid'

type Props = { }

export const Report: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)
  let reportsLoaded = useSelector<RootState, ReportState["reportsLoaded"]>((state) => state.reports.reportsLoaded)
  let { user } = useAuth0();
  let { id } = useParams()

  // State for a single report
  let [report, setReport] = useState<types.Report>(undefined);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [editMode, setEditMode] = useState<boolean>(false);

  async function loadReport () {
    let foundReport = reports.find(report => report.id === id)
    if(foundReport) {
      setReport(foundReport)
      console.log("Loaded Report: ", foundReport);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    // Get the report
    if(reportsLoaded == false && user) {
      getAllReportsByUserId(user?.sub).then(reports => {
        console.log("Loaded All Reports", reports);
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

  async function saveReport () {
    let savedReport = await updateReport(report);
    dispatch({
      type: "REPLACE_REPORT",
      payload: savedReport
    })
    navigate('/reports');
  }

  function cancel () {
    navigate('/reports')
  }
  
  return (
    <>
      <Title title={report ? report.name : "Report"} rightIcon={
        <div className='p-1 cursor-pointer' onClick={()=> setEditMode(!editMode)}>
          {editMode ? 
            <XIcon/> :
            <PencilIcon/> 
          }
        </div>
      }/>
      
      {(!isLoading && report) && 
        <>
          {editMode ? 
            <>
              <FieldsReadWrite report={report} setReportCallback={setReport}/> 
              <div className='flex justify-end mt-4'>
                <button className="button mr-2" onClick={cancel}>Cancel</button>
                <button className="button" onClick={saveReport}>Save</button>
              </div>
            </>:
            <p>Not in edit mode.</p>
          }
        </> ||
        <p>Loading...</p>
      }
      
      
    </>
  )
}