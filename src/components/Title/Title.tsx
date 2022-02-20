import { MenuIcon } from '@heroicons/react/solid';
import React, { FC, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/appReducer';
import { RootState } from '../../store/store';

type Props = { title: string, rightIcon?: ReactElement, subtitle?: string}

export const Title: FC<Props> = (props: Props) => {
  let dispatch = useDispatch()
  let pageTitle = useSelector<RootState, AppState["page"]>((state)=> state.app.page)

  useEffect(()=>{
    dispatch({
      type: "SET_PAGE",
      payload: props.title
    })
  },[props])

  function toggleSidebar () {
    dispatch({
      type: "TOGGLE_SIDEBAR"
    })
  }
  return (
    <div className='flex justify-between items-center mb-4'>
      <button className="flex-none w-8 text-zinc-400" onClick={toggleSidebar}>
        <MenuIcon />
      </button>
      <div className='grow font-montserrat text-center'>
        <h1 className='text-xl sm:text-2xl'>{pageTitle}</h1>
        {
          props.subtitle && 
          <h2 className='text-md sm:text-lg'>{props.subtitle}</h2>
        }
      </div>

      <div className="flex-none w-8">
        {props.rightIcon ?? props.rightIcon}
      </div>
    </div>
  )
}