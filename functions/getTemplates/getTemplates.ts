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
        message: "No Reports found."
      })
    }
  }

  console.log(response.getAllReportTemplatesByUserId.data);

  return {
    statusCode: 200,
    body: JSON.stringify(response.getAllReportTemplatesByUserId.data)
  }
  
}

export type GetTemplatesResponse = {
  getAllReportTemplatesByUserId: {
    data: {
      id: string,
      userId: string,
      name: string,
      fields: []
    }
  }
}

module.exports = { handler }
