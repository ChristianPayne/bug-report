import React, { FC, useState } from 'react'

type Props = { }

export const Login: FC<Props> = () => {
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [loginMessage, setLoginMessage] = useState<string>('')

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
            setLoggedIn(true)
            setLoginMessage("Logged In!")
          } else {
            setLoggedIn(false)
            setLoginMessage("Incorrect username or password.")
          }

        })
      }
    ).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className="text-center font-mono">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center space-y-4 text-2xl text-white">
        <h1 className="text-2xl mb-6 font-montserrat">Bug Report</h1>
        <input 
        onKeyUp={handleInput} 
        onChange={ ($event)=> {handleChangeInput($event, "username")}}
        value={usernameInput}
        className="appearance-none bg-[#282c34] rounded-md border-slate-400 border-2 px-2 py-1" placeholder="Username" 
        />
        <input 
        onKeyUp={handleInput} 
        onChange={($event) => {handleChangeInput($event, "password")}}
        value={passwordInput}
        type="password"
        className="appearance-none bg-[#282c34] rounded-md border-slate-400 border-2 px-2 py-1" placeholder="Password" 
        />
        {
          loginMessage && <p>{loginMessage}</p>
        }
      </header>
    </div>
  )
} 

