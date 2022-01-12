import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LoginState } from '../store/loginReducer';

type Props = { }

export const Login: FC<Props> = () => {
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [loginMessage, setLoginMessage] = useState<string>('')
  const loggedIn = useSelector<LoginState, LoginState["loggedIn"]>((state) => state.loggedIn)
  const dispatch = useDispatch()

  const setLogin = (value: boolean) => {
    dispatch({type: "LOGIN", payload: value})
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

  const logIn = (username: string, password: string): void => {
    fetch('/api/auth', {
      method: "GET",
      headers: {"username": username, "password": password}
    })
    .then(
      (res: Response) => {
        res.json()
        .then((res) => {
          console.log("Res:", res);

          if(res.loggedIn === true) {
            setLogin(true)
            setLoginMessage("Logged In!")
          } else {
            setLogin(false)
            setLoginMessage("Incorrect username or password.")
          }

        })
      }
    ).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <header className="flex flex-col space-y-4 text-2xl min-w-1/2">
        <h1 className="text-2xl mb-6 font-montserrat">Bug Report</h1>
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
        <p>{loginMessage}</p>
        {
          <p>{loggedIn ? "True" : "False"}</p>
        }
      </header>
    </div>
  )
} 

