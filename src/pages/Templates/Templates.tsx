import { useAuth0 } from '@auth0/auth0-react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

import { Title } from "../../components/Title";

type Props = { }

export const Templates: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let {isAuthenticated, logout, user} = useAuth0();

  const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)
  
  return (
    <>
      <Title title="Templates"/>
      <p>
        Templates is working...
      </p>
    </>
  )
}