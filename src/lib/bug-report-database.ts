import { DocumentReference, limit, where } from "firebase/firestore";
import { 
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocumentByRef,
  queryDocuments,
  getCollectionRoot
} from "./firebase";

import { 
  Report,
  ReportTemplate,
  User 
} from "./types";

let usersTable = 'users';
let reportsTable = 'reports';
let reportTemplatesTable = 'reportTemplates';

export async function getRoot() {
  return await getCollectionRoot("users")
}

// Users
export async function getUserByUserId (id: string) : Promise<User> {
  let user = await queryDocuments(usersTable, [where("authId", "==", id), limit(1)])
  return user[0] as User;
}
export async function createUser (user: User) : Promise<User> {
  // Write a new user.
  let userObj: User = await addDocument(usersTable, user) as User;
  // Read the new user and return the data again.
  return userObj;
}
export async function updateUser (user: User) : Promise<User> {
  await updateDocument(usersTable, user.id, user)
  return user as User
}
export async function deleteUser (user: User) : Promise<boolean> {
  return await deleteDocument(usersTable, user.id);
}

// Reports
export async function getReportById (id: string) : Promise<Report> {
  let report = await queryDocuments(reportsTable, [where("id", "==", id), limit(1)]);
  return report[0] as Report;
}
export async function getAllReportsByUserId (userId: string) : Promise<Report[]> {
  let reports = await queryDocuments(reportsTable, [where("userId", "==", userId)]);
  return reports as Array<Report>
}
export async function createReport (report: Report) : Promise<Report> {
  let reportObj: Report = await addDocument(reportsTable, report) as Report;
  return reportObj;
}
export async function updateReport (report: Report) : Promise<Report> {
  await updateDocument(reportsTable, report.id, report);
  return report as Report
}
export async function deleteReport (report: Report) : Promise<boolean> {
  return await deleteDocument(reportsTable, report.id);
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