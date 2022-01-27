import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '../../components/Dropdown'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

type Props = { }

export const NewReport: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let { user } = useAuth0();

  // const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)

  // Get all templates from db
  let templates = [
    {
      name: "Option 1",
      id: "123123123"
    },
    {name: "Option 2"},
    {name: "Option 3"},
  ]


  function getDropdown (option: string) {
    console.log(option);
  }

  
  
  return (
    <div className='text-center'>
      <Title title="New Report" />
      <input type="text" name="Template" placeholder='Template' className='input'/>
      <Dropdown placeholder="Template" options={templates} onSelect={getDropdown}/>
    </div>
  )
}