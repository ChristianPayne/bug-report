import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = { }

export const Login: FC<Props> = () => {
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [loginMessage, setLoginMessage] = useState<string>('')
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const setLogin = (value: boolean, id: string = null) => {
    dispatch({type: "LOGIN", payload: value})
    if(value === true) {
      if (id) {
        console.log("Saving login info.");
        localStorage.setItem("id", id);
        dispatch({type: "SET_ID", payload: id})
      }
      navigate('/reports', {replace: true})
    }
  }

  const handleInput = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') logIn(usernameInput, passwordInput)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>, inputType: string): void => {
    if(inputType === "username") {
      setUsernameInput(event.target.value)
    } else if (inputType === "password") {
      setPasswordInput(event.target.value)
    }
  }

  useEffect(()=> {
    let previousLoginId = localStorage.getItem("id")
    if(previousLoginId) setLogin(true)
    return () => dispatch = null
  },[])

  const logIn = (username: string, password: string): void => {
    fetch('/api/auth', {
      method: "GET",
      headers: {"username": username, "password": password}
    })
    .then(
      (res: Response) => {
        res.json()
        .then((res) => {
          console.log("<<< Res:", res);

          if(res.loggedIn === true) {
            setLogin(true, res.id)
            setLoginMessage("Logged In!")
          } else {
            setLogin(false)
            setLoginMessage("Incorrect username or password.")
          }

        })
      }
    ).catch((err)=>{
      console.error("Login Catch: ", err)
    })
  }

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <header className="flex flex-col space-y-6 text-2xl min-w-1/2">
        <h1 className="text-2xl font-montserrat">Bug Report</h1>
        <input 
        onKeyUp={handleInput} 
        onChange={ ($event)=> {handleChangeInput($event, "username")}}
        value={usernameInput}
        className="appearance-none bg-zinc-900 rounded-md border-zinc-400 border-2 px-2 py-1" placeholder="Username" 
        />
        <input 
        onKeyUp={handleInput} 
        onChange={($event) => {handleChangeInput($event, "password")}}
        value={passwordInput}
        type="password"
        className="appearance-none bg-zinc-900 rounded-md border-zinc-400 border-2 px-2 py-1" placeholder="Password" 
        />
        <div className='flex justify-evenly'>
          <a href="/signup" className='font-montserrat text-sm border p-2 rounded-md border-zinc-400'>Sign Up</a>
          <a onClick={()=> logIn(usernameInput, passwordInput)} 
          className='font-montserrat text-sm cursor-pointer border p-2 rounded-md border-zinc-400'>Log In</a>
        </div>
        <p className={(loginMessage ? '': 'opacity-0') + " text-lg"}>{loginMessage ? loginMessage : "Please Login..."}</p>
      </header>
    </div>
  )
} 

