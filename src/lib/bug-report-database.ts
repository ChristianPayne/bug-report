import { 
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument
} from "./firebase";

import { 
  Report,
  ReportTemplate,
  User 
} from "./types";

// Users
export async function getUserByUserId (id: string) : Promise<User> {
  let doc = await getDocument("users", id) as User;
  return doc;
}
export async function createUser () : Promise<User> {
}
export function updateUser () : User {
}
export function deleteUser () : string {
}

// Reports
export function getReportById () : Report {
}
export function getAllReportsByUserId () : Array<Report> {
}
export function createReport () : Report {
}
export function updateReport () : Report {
}
export function deleteReport () : string {
}

// Report Templates
export function getReportTemplateById () : ReportTemplate {
}
export function getAllReportTemplatesByUserId () : Array<ReportTemplate> {
}
export function createReportTemplate () : ReportTemplate {
}
export function updateReportTemplate () : ReportTemplate {
}
export function deleteReportTemplate () : string {
}