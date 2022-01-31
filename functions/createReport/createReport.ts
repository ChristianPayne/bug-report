import { Handler } from '@netlify/functions';
import { createReport } from "../../infrastructure/fauna-queries/fauna";
const handler: Handler = async (event) => {
  console.log("Start of lambda createReport.ts");

  let newReport = event.body
  

  
  let response: CreateReportResponse = await createReport(newReport)

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

export type CreateReportResponse = {
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
