import { Handler } from '@netlify/functions';
import { getAllReportsByUserId } from "../../infrastructure/fauna-queries/fauna";
const handler: Handler = async (event) => {
  console.log("Start of lambda getReports.ts");  

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

  let response: GetReportsResponse = await getAllReportsByUserId(userId)

  if(response.getAllReportsByUserId == null) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No Reports found."
      })
    }
  }

  // console.log(response.getAllReportsByUserId.data);

  return {
    statusCode: 200,
    body: JSON.stringify(response.getAllReportsByUserId.data)
  }
  
}

export type GetReportsResponse = {
  getAllReportsByUserId: {
    data: {
      id: string,
      userId: string,
      data: string,
      name: string,
      fields: []
    }
  }
}

module.exports = { handler }
