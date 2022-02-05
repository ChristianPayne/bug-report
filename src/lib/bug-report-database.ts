import { DocumentReference } from "firebase/firestore";
import { 
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocumentByRef
} from "./firebase";

import { 
  Report,
  ReportTemplate,
  User 
} from "./types";

let usersTable = 'users';
let reportsTable = 'reports';
let reportTemplatesTable = 'reportTemplates';

// Users
export async function getUserByUserId (id: string) : Promise<User> {
  let doc = await getDocument(usersTable, id) as User;
  return doc;
}
export async function createUser (user: User) : Promise<User> {
  let docRef = await addDocument(usersTable, user);
  return await getDocumentByRef(docRef) as User;
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