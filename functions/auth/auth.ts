import { Handler } from '@netlify/functions';
const handler: Handler = async (event) => {
  try {
    if(event.queryStringParameters?.password) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          loggedIn : true
        })
      }
    } else {
      return {
        statusCode: 403
      }
    }
  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({message: error.toString()}) }
  }
}

module.exports = { handler }
