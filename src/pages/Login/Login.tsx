import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

type Props = { }

export const Login: FC<Props> = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(()=>{
    // Check to see if we have login persistence, dispatch anything we need then route to reports.
    if(isAuthenticated) {
      dispatch({type: "LOGIN", payload: isAuthenticated}) 
      navigate('/reports', {replace: true})
    }
      return () => dispatch = null
  },[isAuthenticated])

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <header className="flex flex-col space-y-6 text-2xl min-w-1/2">
        <h1 className="text-2xl font-montserrat">Bug Report</h1>
        {
          isLoading && 
          <p>Loading...</p> || 
          <>
            <button className='button' onClick={() => loginWithRedirect()}>Log In</button>
          </>
        }
        
      </header>
    </div>
  )
} 

