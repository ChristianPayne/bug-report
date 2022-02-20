import React, { FC, useEffect, useState } from 'react';
import { Title } from "../../components/Title";
import { Menu } from '../../components/Menu'
import { getAllFields } from "../../lib/bug-report-database";


type Props = { }

export const Templates: FC<Props> = () => {
  let [templateFields, setTemplateFields] = useState([])
  
  useEffect(()=>{
    getAllFields().then(fields => {
      setTemplateFields(fields);
    })
  }, []);

  function addNewField (field) {
    console.log('🌾 Field:', field);
    
  }
  
  return (
    <>
      <Title title="Templates"/>
      <div className="flex flex-col h-fit text-center items-center">
        {/* <div className='flex justify-end mt-4'>
          <button className="button mr-2" onClick={()=>{}}>Cancel</button>
          <button className="button" onClick={()=>{}}>Save</button>
        </div> */}
        {
          templateFields && 
          <div className='w-64'>
            <Menu buttonName='New Field' items={templateFields} callback={addNewField}/>
          </div>
        }
      </div>
    </>
  )
}