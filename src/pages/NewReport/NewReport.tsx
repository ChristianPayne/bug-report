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
import { v4 as uuid } from "uuid";
import * as bugReportDatabase from '../../lib/bug-report-database';
import { Report, ReportTemplate } from '../../lib/types'

type Props = { }

export const NewReport: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let { user } = useAuth0();

  let [reportName, setReportName] = useState('Untitled Report');
  
  // Get all templates from db
  let [templates, setTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(null)

  useEffect(()=>{
    if(user) {
      loadTemplates()
    }
  },[user])
  
  function loadTemplates () {
    bugReportDatabase.getAllReportTemplatesByUserId(user?.sub).then(templates => {
      setTemplates(templates)
      setIsLoading(false)
    });
  }

  async function createReport () {
    // Create Report object from template.
    let newReport: Report = {
      id: `Report|${uuid()}`,
      name: reportName,
      userId: user.sub,
      date: Date.now().toString(),
      fields: selectedTemplate.fields.map(field=> {
        return {
          id: `Field|${uuid()}`,
          type: field.type,
          name: field.name,
          value: field.value
        }
      }),
    }
    let createdReport = await bugReportDatabase.createReport(newReport)

    console.log("Created Report: ", createdReport);
    
    // TODO: Add a loading message.

    // Add the report into the state
    dispatch({
      type: "ADD_REPORT",
      payload: newReport
    })

    // Navigate back to reports.
    setTimeout(()=>{
      navigate('/reports')
    }, 300)
  }

  function setTemplate (template) {
    setSelectedTemplate(template);
    // console.log(template);
  }

  function handleFieldValues (value: any, index) {
    let newTemplate = Object.assign({}, selectedTemplate);
    newTemplate.fields[index].value = value;
    setSelectedTemplate(newTemplate)
  }

  function getFieldContent (field, index) {
    switch (field.type) {
      case "text":
        return (
          [
            // Index 0 is the name
            <p className="">{field.name}</p>,
            // Index 1 is the content
            <textarea className="bg-zinc-900 border rounded-md border-zinc-400 scrollbar w-full" placeholder='Enter text here...' onChange={(event)=>{handleFieldValues(event.target.value, index)}} value={field.value}/>
          ]
        )
      case 'switch':
        return (
          [
            // Index 0 is the name
            <p className="">{field.name}</p>,
            // Index 1 is the content
            <Switch
            checked={field.value}
            onChange={(value: boolean) => {handleFieldValues(value, index)}}
            className={`bg-zinc-100 inline-flex items-center h-6 rounded-full w-11`}>
                <span
                  className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-zinc-800 rounded-full transition-transform`}
                />
            </Switch>
          ]
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
                            { !templates && ("Loading...") ||
                              (selectedTemplate ? selectedTemplate.name : "Select Template")
                            }
                          </p>
                          {
                            !open && 
                            <ChevronDownIcon className="-mr-1 ml-2 mt-0.5 h-5 w-5 flex-none" aria-hidden="true" /> ||
                            <ChevronUpIcon className="-mr-1 ml-2 mt-0.5 h-5 w-5 flex-none" aria-hidden="true"/>
                          }
                        </div>
                      </Listbox.Button>
                      {
                        (templates && open) && 
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
                      }
                </>
              )
            }
          </Listbox>
        </div>
        
        {/* Report Fields */}
        {
          selectedTemplate && 
          <>
            <div className="flex text-md mt-4 w-full justify-between">
              <p className='md:basis-1/3 md:w-64 mr-4'>Report Name</p>
              <input className='grow input truncate' type="text" placeholder={reportName} onChange={(event)=>{setReportName(event.target.value)}} />
            </div>
            {
              selectedTemplate.fields.map((field, i)=>{
                let fieldContent = getFieldContent (field, i)
                return (
                  <div className="flex text-md mt-4 w-full justify-between" key={i}>
                    <div className="md:basis-1/3 md:w-64 mr-4">{fieldContent[0]}</div>
                    <div className='grow'>{fieldContent[1]}</div>
                  </div>
                )
              })
            }
            <button className="button mt-4" onClick={createReport}>Create Report</button>
          </>
        }
      </div>
    </>
  )
}