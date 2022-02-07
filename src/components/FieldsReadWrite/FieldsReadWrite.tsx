import React, { FC } from "react";
import { Switch } from '@headlessui/react'

type Props = { report, setReportCallback }

/**
 * 
 * WORKING ON GETTING THIS THING TO RENDER CORRECTLY.
 * STATE MANAGEMENT AND CALLBACKS NEED TO BE LOOKED AT MORE.
 * ALSO TAKE A LOOK AT THE NEW REPORT PAGE TO SEE IF WE CAN USE THIS COMPONENT
 * THERE AS WELL.
 * 
 */

export const FieldsReadWrite: FC<Props> = ({ report, setReportCallback }: Props) => {

  function handleFieldValues (value: any, index) {
    let newReport = Object.assign({}, report);
    newReport.fields[index].value = value;
    setReportCallback(newReport)
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
    <div className='flex flex-col justify-center text-center items-center'>
      <div className="flex text-md mt-4 w-full justify-between">
        <p className='md:basis-1/3 md:w-64 mr-4'>Report Name</p>
        <input className='grow input truncate' type="text" value={report?.name} onChange={(event)=>{setReportCallback({...report, name: event.target.value})}} />
      </div>
      {report &&
        report.fields.map((field, i)=>{
          let fieldContent = getFieldContent (field, i)
          return (
            <div className="flex text-md mt-4 w-full justify-between" key={i}>
              <div className="md:basis-1/3 md:w-64 mr-4">{fieldContent[0]}</div>
              <div className='grow'>{fieldContent[1]}</div>
            </div>
          )
        })
      }
    </div>
  )
}