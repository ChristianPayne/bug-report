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
import { FieldType, Report, ReportTemplate } from '../../lib/types'
import { FieldsReadWrite } from '../../components/FieldsReadWrite'

type Props = { }

export const NewReport: FC<Props> = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [isLoading, setIsLoading] = useState(true)
  let { user } = useAuth0();
  
  // Get all templates from db
  let [templates, setTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(null)
  const [newReport, setNewReport] = useState<ReportTemplate>({
    name: "Untitled Report",
    userId: "NoUserId",
    id: "Report|NoID",
    fields: []
  })

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
    let reportObj: Report = {
      id: `Report|${uuid()}`,
      name: newReport.name,
      userId: user.sub,
      date: Date.now(),
      reportTemplate: selectedTemplate.id,
      fields: newReport.fields.map(field=> {
        return {
          id: `Field|${uuid()}`,
          type: field.type,
          name: field.name,
          value: field.value
        }
      }),
    }
    let createdReport = await bugReportDatabase.createReport(reportObj)

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
    setNewReport(template);
    setSelectedTemplate(template)
    // console.log(template);
  }
  
  return (
    <>
      <Title title="New Report" />
      <div className='flex flex-col justify-center text-center items-center'>
        {/* Template select drop down */}
        <div className="ring-2 ring-zinc-400 rounded-md px-2 py-1 w-64">
          <Listbox value={newReport} onChange={setTemplate}>
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
            <FieldsReadWrite report={newReport as Report} setReportCallback={setNewReport}/>
            <button className="button mt-4" onClick={createReport}>Create Report</button>
          </>
        }
      </div>
    </>
  )
}