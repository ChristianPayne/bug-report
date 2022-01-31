import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
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
    <div className='flex justify-between items-center mb-4'>
      <button className="flex-none button-no-border w-8 text-zinc-400" onClick={toggleSidebar}>
        {isSidebarOpen ? <ChevronDoubleLeftIcon/> : <ChevronDoubleRightIcon/>}
      </button>
      <h1 className='grow text-xl sm:text-2xl font-montserrat text-center'>{pageTitle}</h1>
      <div className="flex-none w-16"></div>
    </div>
  )
}