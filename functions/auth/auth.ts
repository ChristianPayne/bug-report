import { Handler } from '@netlify/functions';
const handler: Handler = async (event) => {
  console.log("Start of lambda Auth.ts");
  
  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
module.exports = { handler }
