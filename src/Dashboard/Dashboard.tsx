import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = { }

export const Dashboard: FC<Props> = () => {
  let navigate = useNavigate()

  useEffect(()=>{
    navigate('/reports')
  },[])

  return (
    <>
    </>
  )
}