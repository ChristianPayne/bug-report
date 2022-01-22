import { Handler } from '@netlify/functions';
import { getAuth } from "../../infrastructure/schema/fauna";
import { check } from "../../infrastructure/utils/bcrypt";
const handler: Handler = async (event) => {
  console.log("Start of lambda Auth.ts");
  
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
  
  let res: AuthResponse = await getAuth(username)
  if(res.getUserByUsername == null) {
    // console.log(">>> NULL");
    return {
      statusCode: 404,
      body: JSON.stringify({
        loggedIn: false,
        message: "User not found."
      })
    }
  }

  let authResult = false;
  try {    
    authResult = await check(password, res.getUserByUsername.password)
  } catch (err) {
    console.log(err);
  }
  
  if(authResult === true) {
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        loggedIn : true
      })
    }
  } 
  return {
    statusCode: 403,
    body: JSON.stringify({
      loggedIn : false,
      message:"Username or password incorrect."
    })
  }

}

export type AuthResponse = {
  getUserByUsername: {
    id: string,
    username: string,
    password: string
  }
}

module.exports = { handler }
