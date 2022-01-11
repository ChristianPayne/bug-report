import { Handler } from '@netlify/functions';
import { getAuth } from "../schema/fauna";
const handler: Handler = async (event) => {
  try {
    if(event.headers.username && event.headers.password) {
      let username = event.headers.username;
      let password = event.headers.password;

      await getAuth(username, password).then((res: Response) => {
        console.log(res.auth.password === password);
        
        if(res.auth.password === password) {
          return {
            statusCode: 200,
            body: JSON.stringify({
              loggedIn : true
            })
          }
        } else {
          return {
            statusCode: 403,
            body: JSON.stringify({
              loggedIn : false
            })
          }
        }
      })
      
    } else {
      console.log("USERNAME OR PASSWORD NOT SUPPLIED");
      
      return {
        statusCode: 403
      }
    }
  } catch (error: any) {
    console.log("HULLO?", error)
    return { statusCode: 500, body: JSON.stringify({message: error.toString()}) }
  }
}

module.exports = { handler }
