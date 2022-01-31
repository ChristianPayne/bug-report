import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET = process.env.FAUNADB_ADMIN_SECRET || process.env.FAUNADB_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql';
const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers : {
    authorization : `Bearer ${CLIENT_SECRET}`,
  },
})

export async function getAllReportsByUserId(userId: string) {    
  const query = gql`
    query getAllReportsByUserId ($userId: String!) {
      getAllReportsByUserId (userId: $userId) {
        data {
          id
          name
          userId
        }
      }
    }` 
  return await graphQLClient.request(query, {userId})
}

export async function getAllReportTemplatesByUserId(userId: string) {
  const query = gql`
    query getAllReportTemplatesByUserId ($userId: String!) {
      getAllReportTemplatesByUserId (userId: $userId) {
        data {
          id
          userId
          name
          fields {
            id
            type
            name
            value
          }
        }
      }
    }` 
  return await graphQLClient.request(query, {userId})
}

export async function createReport (report: string) {
  // console.log("Request data: ", report);

  let reportObj = JSON.parse(report)

  // console.log("Parsed report: ", reportObj);
  
  
  
  const mutation = gql`
    mutation createReport ($report: ReportInput!) {
      createReport (report: $report) {
        id
      }
    }`  
  return await graphQLClient.request(mutation, {report: reportObj})
}