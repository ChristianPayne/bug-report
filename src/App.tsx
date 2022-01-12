import React, { FC, useEffect } from 'react'
import { Login } from "./Login";
import { useSelector } from 'react-redux';
import { LoginState } from './store/loginReducer';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Home } from './Home/Home';

type Props = { }

export const App: FC<Props> = () => {
  const loggedIn = useSelector<LoginState, LoginState["loggedIn"]>((state) => state.loggedIn)
  let navigate = useNavigate();
  

  useEffect(()=>{
    if(loggedIn === false) {
      console.log("Nav to login");
      navigate('/login', {replace: true})
    }
  },[loggedIn])

  return (
    <div className='bg-zinc-900 text-zinc-100 h-screen font-mono'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}