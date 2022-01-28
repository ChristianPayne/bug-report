import { useAuth0 } from '@auth0/auth0-react'
import { Listbox, Switch } from '@headlessui/react'
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
  
  // Get all templates from db
  let [templates, setTemplates] = useState([])
  


  // const reports = useSelector<RootState, ReportState["reports"]>((state) => state.reports.reports)


  const [selectedTemplate, setSelectedTemplate] = useState({name: "Choose Template", fields: []})

  useEffect(()=>{
    loadTemplates()
  },[])
  
  function loadTemplates () {

  }

  function saveNewReport () {

  }

  function setTemplate (template) {
    setSelectedTemplate(template);
    console.log(template);
  }

  function handleFieldValues (value: any, index) {
    let newTemplate = Object.assign({}, selectedTemplate);
    newTemplate.fields[index].value = value;
    setSelectedTemplate(newTemplate)
  }

  function getFieldContent (field, index) {
    switch (field.type) {
      case "string":
        return (
          <div className="flex text-md mt-4">
            <p className="w-32 mr-4">{field.name}</p>
            <textarea className="grow bg-zinc-900 border rounded-md border-zinc-400 px-2 scrollbar" placeholder='Enter text here...' onChange={(event)=>{handleFieldValues(event.target.value, index)}} />
          </div>
        )
      case 'switch':
        return (
          <div className="flex text-md mt-4">
            <p className="w-32 mr-4">{field.name}</p>
            <Switch
              checked={field.value}
              onChange={(value: boolean) => {handleFieldValues(value, index)}}
              className={`bg-zinc-100 inline-flex items-center h-6 rounded-full w-11`}>
                <span
                  className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-zinc-800 rounded-full transition-transform`}
                />
            </Switch>
          </div>
        )
      default:
        return <></>
    }
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
        
        {/* Report Fields */}
        {
          selectedTemplate.fields.map((field, i)=>{
            let fieldContent = getFieldContent (field, i)
            return (
              <Fragment key={i}>
                {/* <div className="flex-none w-full border-b mt-4 border-zinc-400"></div> */}
                {fieldContent}
              </Fragment>
            )
          })
        }
      </div>
    </>
  )
}