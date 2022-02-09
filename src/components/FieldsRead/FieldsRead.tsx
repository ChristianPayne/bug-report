import React, { FC } from "react";
import { Switch } from '@headlessui/react'
import { FieldType, Report } from "../../lib/types";

type Props = { 
  report: Report, 
  setReportCallback: Function
}

export const FieldsRead: FC<Props> = ({ report, setReportCallback }: Props) => {

  function handleFieldValues (value: any, index) {
    let newReport = Object.assign({}, report);
    newReport.fields[index].value = value;
    setReportCallback(newReport)
  }

  function getFieldContent (field, index) {
    switch (field.type) {
      case FieldType.text:
        return (
            // <textarea className="bg-zinc-900 border rounded-md border-zinc-400 scrollbar w-full p-2" placeholder='Enter text here...' onChange={(event)=>{handleFieldValues(event.target.value, index)}} value={field.value}/>
            <p className="w-full p-2">
              {field.value}
            </p>
        )
      case FieldType.switch:
        return (
            <Switch
            checked={field.value}
            onChange={(value: boolean) => {}}
            className={`bg-zinc-100 inline-flex items-center h-6 rounded-full w-11`}>
                <span
                  className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-zinc-800 rounded-full transition-transform`}
                />
            </Switch>
        )
      default:
        return <></>
    }
  }


  return (
    <div className='flex flex-col justify-center text-center items-center'>
      {report &&
        report.fields.map((field, i)=>{
          let fieldContent = getFieldContent (field, i)
          return (
            <div className="flex text-md mt-4 w-full justify-between" key={i}>
              {/* <div className="md:basis-1/3 md:w-64 mr-4">{fieldContent[0]}</div> */}
              <div className='grow'>{fieldContent}</div>
            </div>
          )
        })
      }
    </div>
  )
}