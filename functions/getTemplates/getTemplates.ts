import { Handler } from '@netlify/functions';
import { getAllReportTemplatesByUserId } from "../../infrastructure/fauna-queries/fauna";
const handler: Handler = async (event) => {
  console.log("Start of lambda getTemplates.ts");  

  if(event.headers.userid == "" || event.headers.userid == null) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          loggedIn: false,
          message: "UserId malformed."
        }
      )
    }
  }

  let userId = event.headers.userid

  let response: GetTemplatesResponse = await getAllReportTemplatesByUserId(userId)

  if(response.getAllReportTemplatesByUserId == null) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No Templates found."
      })
    }
  }

  // console.log(response.getAllReportTemplatesByUserId.data);
  // console.log(JSON.stringify(response.getAllReportTemplatesByUserId.data, null, 2));

  // FIXME: This problem will need to be solved a different way. Brute forcing all values from a string is not a sustainable way to parse from a string.
  function processValue (value) {
    if(value === "true") return true;
    if(value === "false") return false;
    return value;
  }

  let processedData = response.getAllReportTemplatesByUserId.data.map((template)=>{
    let processedTemplate = {
      ...template,
      fields : template.fields.map(field => {
        console.log("Field Data: ", field.value);
        return {
          ...field,
          value : processValue(field.value)
        }
      })
    }
    // console.log(processedTemplate);
    
    return processedTemplate
  })

  

  return {
    statusCode: 200,
    body: JSON.stringify(processedData)
  }
  
}

export type GetTemplatesResponse = {
  getAllReportTemplatesByUserId: {
    data: [
      {
        id: string,
        userId: string,
        name: string,
        fields: Array<any>
      }
    ]
  }
}

module.exports = { handler }
