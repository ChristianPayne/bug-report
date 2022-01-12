import { Handler } from '@netlify/functions';
import { getAuth } from "../../infrastructure/schema/fauna";
import { check } from "../../infrastructure/utils/bcrypt";
const handler: Handler = async (event) => {
  console.log("Start of lambda 'Auth.ts'");
  
  if((event.headers.username == "" || event.headers.username == null) || (event.headers.password == "" || event.headers.password == null)) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          loggedIn: false,
          message: "Username or password malformed."
        }
      )
    }
  }
    
  let username = event.headers.username;
  let password = event.headers.password;

  // console.info(">>> Auth.ts inputs: ", username, password)
    
  // Use this for saving a new password.
  // let hash = await encrypt(password)
  // console.log(`Hash == ${hash}`)

  
  let res: AuthResponse = await getAuth(username)
  // console.log(">>> Fauna Res", res);

  if(res.auth == null) {
    // console.log(">>> NULL");
    return {
      statusCode: 404,
      body: JSON.stringify({
        loggedIn: false,
        message: "User not found."
      })
    }
  }
  
  let authResult = await check(password, res.auth.password)
  
  if(authResult === true) {
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
        loggedIn : false,
        message:"Username or password incorrect."
      })
    }
  }

}

export type AuthResponse = {
  auth: {
    username: string,
    password: string
  }
}

module.exports = { handler }
