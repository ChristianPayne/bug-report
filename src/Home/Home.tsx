import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = { }

export const Home: FC<Props> = () => {
  let navigate = useNavigate()

  const data = [
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Really long title that I could put",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: true
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
    {
      id: "123123",
      date: new Date('Jan 11 2022'),
      title: "Title",
      headache: false
    },
  ]

  function entryClick (id: string) {
    navigate(`report/${id}`)
  } 

  return (
    <div className='flex flex-col items-center justify-center space-x-6 space-y-6 overflow-y-scroll h-full scrollbar'>
      {
        data.map((item, i)=>{
          return (
            <button key={item.id + i} className='text-left border border-zinc-100 p-2 flex'
            onClick={()=>{entryClick(item.id)}}>
              <p className='mr-2'>{item.id}</p>
              <p className='mr-2'>{item.date.toDateString()}</p>
              <p className='mr-2'>{item.title}</p>
              <p className=''>{(item.headache ? "" : "No ") + "Headache"}</p>
            </button>
          )
          
        })
      }
    </div>
  )
}