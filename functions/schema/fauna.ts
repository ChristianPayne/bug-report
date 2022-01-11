import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET = process.env.FAUNADB_ADMIN_SECRET || process.env.FAUNADB_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql';
const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers : {
    authorization : `Bearer ${CLIENT_SECRET}`,
  },
})

export async function getAuth(username: string, password: string) {  
  const query = gql`
    query getAuth ($username: String!) {
      auth (username: $username) {
        password
      }
    }` 
  
  let response = await graphQLClient.request(query, {username})

  console.log("Fauna Returned: ", response);
  

  return response
}