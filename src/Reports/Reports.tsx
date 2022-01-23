import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportState } from '../store/reportReducer'
import { RootState } from '../store/store'

type Props = { }

export const Reports: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)

  console.log('Reports:', reports);
  

  useEffect(()=>{
    // Call the backend to get reports, passing our id
    fetch('/api/getReports', {
      method: "GET",
      headers: {userId: "123"}
    }).then(result => {
      result.json().then(data => {
        console.log(data);
        // Update the store with the reports
        dispatch({
          type: "ADD_REPORTS",
          payload: data
        })
      })
    })
  },[])

  function entryClick (id: string) {
    // Append id onto the url
    navigate(`${id}`)
  } 

  return (
    <div className='flex flex-col h-fit'>
      <h1 className='text-2xl font-montserrat text-center'>Reports</h1>
      {
        reports.map((item, i)=>{
          return (
            <button key={item.id + i} className='text-left border border-zinc-100 p-2 flex items-center my-3 mx-4 justify-between md:justify-evenly'
            onClick={()=>{entryClick(item.id)}}>
              {
                Object.keys(item).map((key,i)=>{
                  return(
                    <>
                      <div key={`${item}|${key}|${i}`} className='flex justify-center w-full'>
                        <p>{item[key]}</p>
                      </div>
                      {i == Object.keys(item).length - 1 ? <></> : <>&#124;</>}
                    </>
                  )
                })
              }
            </button>
          )
        })
      }
    </div>
  )
}