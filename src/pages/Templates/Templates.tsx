import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

import { Title } from "../../components/Title";
import { Dropdown } from '../../components/Dropdown'

type Props = { }

export const Templates: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {isAuthenticated, logout, user} = useAuth0();
  
  return (
    <>
      <Title title="Templates"/>
      <div className="flex flex-col h-fit text-center">


        <div className="flex-none w-64">
          <Dropdown placeholder='New Field' options={[
            {name: "Text Box"},
            {name: "Switch Box"}
          ]} onSelect={()=>{}}/>
        </div>
        <div className='flex justify-end mt-4'>
          <button className="button mr-2" onClick={()=>{}}>Cancel</button>
          <button className="button" onClick={()=>{}}>Save</button>
        </div>
      </div>
    </>
  )
}