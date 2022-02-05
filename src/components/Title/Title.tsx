import { MenuIcon } from '@heroicons/react/solid'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/appReducer'
import { RootState } from '../../store/store'
import { createUser, getUserByUserId } from "../../lib/bug-report-database";

type Props = { title: string }

export const Title: FC<Props> = (props: Props) => {
  let dispatch = useDispatch()
  let pageTitle = useSelector<RootState, AppState["page"]>((state)=> state.app.page)


  useEffect(()=>{
    dispatch({
      type: "SET_PAGE",
      payload: props.title
    })
  },[])

  async function test () {
    // let result = await getUserByUserId("rPV46nOnbMSuQYtM0Kta")
    // console.log(result);

    let newDoc = await createUser({
      id: "12345",
      role: "Admin"
    })
    console.log(newDoc);
    
  }

  function toggleSidebar () {
    dispatch({
      type: "TOGGLE_SIDEBAR"
    })
  }
  return (
    <div className='flex justify-between items-center mb-4'>
      <button className="flex-none button-no-border w-8 text-zinc-400" onClick={toggleSidebar}>
        <MenuIcon />
      </button>
      <h1 className='grow text-xl sm:text-2xl font-montserrat text-center'>{pageTitle}</h1>
      <div className="flex-none w-8">
        <button className='button' onClick={test}>
          Test
        </button>
      </div>
    </div>
  )
}