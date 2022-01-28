import { useAuth0 } from '@auth0/auth0-react'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '../../components/Dropdown'
import { Title } from '../../components/Title'
import { ReportState } from '../../store/reportReducer'
import { RootState } from '../../store/store'

type Props = { }

export const NewReport: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let { user } = useAuth0();
  const [selectedTemplate, setSelectedTemplate] = useState({name: "Select Template"})


  // const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)

  // Get all templates from db
  let templates = [
    {
      name: "Option 1",
      id: "123123123"
    },
    {
      name: "skldjfhaskjdfhkalsdhfklajshdkfahsdkfjhaskdlfjhaskjldfhklajsdhfkl",
      id: "02374982374"
    },
    {
      name: "Option 3",
      id: "32452345"
    },
  ]


  function setTemplate (option) {
    setSelectedTemplate(option);
    console.log(option);
  }
  
  return (
    <>
      <Title title="New Report" />
      <div className='flex flex-col justify-center text-center items-center'>
        {/* Template select drop down */}
        <div className="ring-2 ring-zinc-400 rounded-md px-2 py-1 w-64">
          <Listbox value={selectedTemplate} onChange={setTemplate}>
            {
              ({open}) => (
                <>
                  <Listbox.Button className="w-full">
                    <div className='flex justify-between'>
                      <p className="truncate">
                        {selectedTemplate.name}
                      </p>
                      {
                        !open && 
                        <ChevronDownIcon className="-mr-1 ml-2 mt-0.5 h-5 w-5 flex-none" aria-hidden="true" /> ||
                        <ChevronUpIcon className="-mr-1 ml-2 mt-0.5 h-5 w-5 flex-none" aria-hidden="true"/>
                      }
                    </div>
                  </Listbox.Button>
                  <Listbox.Options>
                    {
                      templates.map((template, i)=>(
                        <Listbox.Option
                          key={template.id || i}
                          value={template}
                        >
                          <div className='cursor-pointer px-4 py-2 truncate text-zinc-400 hover:text-zinc-100'>
                            {template.name}
                          </div>
                        </Listbox.Option>
                      ))
                    }
                  </Listbox.Options>
                </>
              )
            }
          </Listbox>
        </div>
      </div>
    </>
  )
}