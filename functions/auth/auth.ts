import { Handler } from '@netlify/functions';
import { getUserByUsername } from "../../infrastructure/fauna-queries/fauna";
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
  
  let response: AuthResponse = await getUserByUsername(username)
  if(response.getUserByUsername == null) {
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
    authResult = await check(password, response.getUserByUsername.password)
  } catch (err) {
    console.log(err);
  }
  
  if(authResult === true) {
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        id: response.getUserByUsername.id,
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
