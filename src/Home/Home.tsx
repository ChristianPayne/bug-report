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
    <div className='flex flex-col h-fit'>
      <h1 className='text-2xl font-montserrat text-center'>Reports</h1>
      {
        data.map((item, i)=>{
          return (
            <button key={item.id + i} className='text-left border border-zinc-100 p-2 flex items-center my-3 mx-4 justify-between'
            onClick={()=>{entryClick(item.id)}}>
              <p className='mr-2'>{(item.headache ? "" : "No ") + "Headache"}</p>
              &#124;
              <p className='mr-2'>{item.id}</p>
              &#124;
              <p className='mr-2'>{item.date.toDateString()}</p>
              &#124;
              <p className=''>{item.title}</p>
            </button>
          )
          
        })
      }
    </div>
  )
}