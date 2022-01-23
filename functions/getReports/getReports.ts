import { Handler } from '@netlify/functions';
import { getAllReportsByUserId } from "../../infrastructure/schema/fauna";
const handler: Handler = async (event) => {
  console.log("Start of lambda getReports.ts");  

  let res = await getAllReportsByUserId(event.headers.userid)

  console.log(res);

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
  
}

export type GetReportsResponse = {
}

module.exports = { handler }
