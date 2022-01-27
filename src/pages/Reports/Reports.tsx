import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

type Props = { }

export const Reports: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let {isAuthenticated, logout, user} = useAuth0();
  let reportFieldsToShow = [
    "id","name","userId"
  ]
  const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)
  
  // Get Reports after user has been retrieved.
  useEffect(()=>{
    user && console.log(user);
    if(user){
      // Clear reports before pulling again.
      reports && 
      dispatch({
        type: "CLEAR_REPORTS"
      })
      // Call the backend to get reports, passing our id
      fetch('/api/getReports', {
        method: "GET",
        headers: {userId: user?.sub}
      }).then(result => {
        result.json().then(data => {
          // Update the store with the reports
          dispatch({
            type: "ADD_REPORTS",
            payload: data
          })
          setIsLoading(false);
        })
      })
    }
  },[user])

  function entryClick (id: string) {
    // Append id onto the url
    navigate(`${id}`)
  } 

  return (
    <div className='flex flex-col h-fit text-center'>
      <div className='grid grid-flow-col grid-cols-3 mx-4 items-center'>
        <button className="button sm:w-1/3 place-self-start" onClick={()=> navigate('new')}>New Report</button>
        <h1 className='col-start-2 text-2xl font-montserrat text-center'>Reports</h1>
        {isAuthenticated &&
          <button className='button col-start-3 sm:w-1/3 place-self-end' onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>}
      </div>

      {
        !isLoading && (
          reports.map((item, i)=>{
            return (
              <button key={item.id + i} className='text-left border border-zinc-100 p-2 overflow-auto sm:flex items-center mt-3 mx-4 justify-between md:justify-evenly rounded-md'
              onClick={()=>{entryClick(item.id)}}>
                {
                  reportFieldsToShow.map((key,i)=>{
                    return(
                      <Fragment key={`${item}|${key}|${i}`}>
                        <div className='flex justify-center w-full'>
                          <p>{item[key]}</p>
                        </div>
                        {i == reportFieldsToShow.length - 1 ? <></> : <div className="hidden sm:block">&#124;</div>}
                      </Fragment>
                    )
                  })
                }
              </button>
            )
          })
        ) || (
          <p className='text-lg'>Loading...</p>
        )
      }
    </div>
  )
}