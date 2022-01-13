import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET = process.env.FAUNADB_ADMIN_SECRET || process.env.FAUNADB_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql';
const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers : {
    authorization : `Bearer ${CLIENT_SECRET}`,
  },
})

export async function getAuth(username: string) {  
  const query = gql`
    query getUserByUsername ($username: String!) {
      getUserByUsername (username: $username) {
          id
          username
          password
      }
    }` 
  return await graphQLClient.request(query, {username})
}