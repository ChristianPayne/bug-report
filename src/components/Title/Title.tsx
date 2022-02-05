import { MenuIcon } from '@heroicons/react/solid'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/appReducer'
import { RootState } from '../../store/store'
import { createUser, getUserByUserId, updateUser } from "../../lib/bug-report-database";
import { useAuth0 } from '@auth0/auth0-react'

type Props = { title: string }

export const Title: FC<Props> = (props: Props) => {
  let dispatch = useDispatch()
  let pageTitle = useSelector<RootState, AppState["page"]>((state)=> state.app.page)

  let {user} = useAuth0()


  useEffect(()=>{
    dispatch({
      type: "SET_PAGE",
      payload: props.title
    })
  },[])

  async function test () {
    // let result = await getUserByUserId("rPV46nOnbMSuQYtM0Kta")
    // console.log(result);

    // let newDoc = await createUser({
    //   authId: user?.sub,
    //   role: "Admin"
    // })
    // console.log(newDoc);

    // let getDoc = await getUserByUserId(user?.sub)
    // console.log(getDoc);
    
    let user = updateUser({id: "YrucOngpEj9sunEaYPau"})
    
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