import React, { FC, useState } from 'react'

type Props = { }

export const App: FC<Props> = () => {
  const [input, setInput] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const handleInput = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') logIn(input)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value)
  }

  const logIn = (password: string): void => {
    fetch(`/api/auth?password=${password}`)
    .then(
      (res: any) => {
        res.json().then((res: any) => setLoggedIn(true))
      }
    )
  }

  return (
    <div className="text-center font-mono">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center space-y-4 text-2xl text-white">
        <h1 className="text-2xl mb-6 font-montserrat">Bug Report</h1>
        <input 
        onKeyUp={handleInput} 
        onChange={handleChangeInput}
        value={input}
        type="password"
        className="appearance-none bg-[#282c34] rounded-md border-slate-400 border-2 px-2 py-1" placeholder="Password" 
        />
        {
          loggedIn && <p>Logged in</p>
        }
      </header>
    </div>
  )
}