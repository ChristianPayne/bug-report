import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'
import { TrashIcon } from '@heroicons/react/solid'


type Props = { }

export const Reports: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let {isAuthenticated, logout, user} = useAuth0();
  let reportFieldsToShow = [
    "id","name"
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
          console.log(data);
          
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

  function deleteReport (id: string) {
    // console.warn(`Delete Report not implemented. Delete report ${id}`);
    fetch('/api/deleteReport', {
      method: "POST",
      body: JSON.stringify({id})
    }).then(result => {
      console.log(result);
      
    })
  }

  return (
    <div className='flex flex-col h-fit text-center'>
      <Title title="Reports"/>
      {(!isLoading && reports.length === 0) && 
        <div className='text-center'>
          <p className="text-md">No Reports!</p>
          <button className="button md:w-32 mt-4" onClick={()=>{navigate('new')}}>Create One</button>
        </div>
      }
      {
        !isLoading && (
          reports.map((item, i)=>{
            return (
              <div key={item.id + i}  className='flex w-full border border-zinc-100 rounded-md mt-3'>
                <button className='grow text-left p-2 overflow-auto sm:flex items-center justify-between md:justify-evenly'
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
                <button className='w-8 flex-none ml-4 p-1 align-middle' onClick={() => deleteReport(item.id)}>
                  <TrashIcon />
                </button>
              </div>
            )
          })
        ) || (
          <p className='text-lg'>Loading...</p>
        )
      }
    </div>
  )
}