import { Handler } from '@netlify/functions';
import { deleteReport } from "../../infrastructure/fauna-queries/fauna";
const handler: Handler = async (event) => {
  console.log("Start of lambda deleteReport.ts");
  let body = JSON.parse(event.body);

  let reportId = body.id
  

  
  let response: DeleteReportResponse = await deleteReport(reportId)

  console.log(response);
  

  // if(response.getAllReportsByUserId == null) {
  //   return {
  //     statusCode: 404,
  //     body: JSON.stringify({
  //       message: "No Reports found."
  //     })
  //   }
  // }

  // console.log(response.getAllReportsByUserId.data);

  return {
    statusCode: 200,
    body: JSON.stringify("Good")
  }
  
}

export type DeleteReportResponse = {
  deleteReport: {
    data: {
      complete: boolean
    }
  }
}

module.exports = { handler }
