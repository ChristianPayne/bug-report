import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/appReducer'
import { RootState } from '../../store/store'

type Props = { title: string }

export const Title: FC<Props> = (props: Props) => {
  let dispatch = useDispatch()
  let pageTitle = useSelector<RootState, AppState["page"]>((state)=> state.app.page)
  let isSidebarOpen = useSelector<RootState, AppState["isSidebarOpen"]>((state)=> state.app.isSidebarOpen)

  useEffect(()=>{
    dispatch({
      type: "SET_PAGE",
      payload: props.title
    })
  },[])

  function toggleSidebar () {
    dispatch({
      type: "TOGGLE_SIDEBAR"
    })
  }
  return (
    <div className='grid grid-flow-col grid-cols-3 items-center mb-4'>
      <button className="button place-self-start" onClick={toggleSidebar}>
        {isSidebarOpen ? <>&lt;&lt;&lt;</> : <>&gt;&gt;&gt;</>}
      </button>
      <h1 className='col-start-2 text-2xl font-montserrat text-center'>{pageTitle}</h1>
    </div>
  )
}