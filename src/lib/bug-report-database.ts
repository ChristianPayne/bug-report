import { DocumentReference, limit, where } from "firebase/firestore";
import { 
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocumentByRef,
  queryDocuments
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
  let user = await queryDocuments(usersTable, [where("authId", "==", id), limit(1)])
  return user[0] as User;
}
export async function createUser (user: User) : Promise<User> {
  // Write a new user.
  let docRef: DocumentReference = await addDocument(usersTable, user);
  // Read the new user and return the data again.
  return {...user, id: docRef.id};
}
export async function updateUser (user: User) : Promise<User> {
  let userDoc = await updateDocument(usersTable, user.id, {another: "Another Update 2"})
  console.log(userDoc);
  
  return user as User
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