import { limit, where } from "firebase/firestore";
import { 
  addDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  getCollectionRoot
} from "./firebase";

import { 
  Report,
  ReportField,
  ReportTemplate,
  User 
} from "./types";

let [usersTable, reportsTable, reportTemplatesTable, fieldTable] = [
  'users',
  'reports',
  'reportTemplates',
  'fields'
]

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
  await updateDocument(usersTable, user.id, user);
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
export async function getAllReportsByUserId (userId: string, size: number = 25) : Promise<Report[]> {
  let reports = await queryDocuments(reportsTable, [where("userId", "==", userId), limit(size)]);
  return reports as Array<Report>;
}
export async function createReport (report: Report) : Promise<Report> {
  let reportObj: Report = await addDocument(reportsTable, report) as Report;
  return reportObj;
}
export async function updateReport (report: Report) : Promise<Report> {
  await updateDocument(reportsTable, report.id, report);
  return report as Report;
}
export async function deleteReport (report: Report) : Promise<boolean> {
  return await deleteDocument(reportsTable, report.id);
}

// Report Templates
export async function getReportTemplateById (id: string) : Promise<ReportTemplate> {
  let template = await queryDocuments(reportTemplatesTable, [where('id', '==', id), limit(1)]);
  return template[0] as ReportTemplate;
}
export async function getAllReportTemplatesByUserId (userId: string) : Promise<ReportTemplate[]> {
  let templates = await queryDocuments(reportTemplatesTable, [where('userId', '==', userId)]);
  return templates as Array<ReportTemplate>;
}
export async function createReportTemplate (template: ReportTemplate) : Promise<ReportTemplate> {
  let templateObj: ReportTemplate = await addDocument(reportTemplatesTable, template) as ReportTemplate;
  return templateObj;
}
export async function updateReportTemplate (template: ReportTemplate) : Promise<ReportTemplate> {
  await updateDocument(reportTemplatesTable, template.id, template);
  return template as ReportTemplate;
}

/**
 * @param template Which Report Template to delete from the database.
 * @returns Whether or not it was deleted.
 */
export async function deleteReportTemplate (template: ReportTemplate) : Promise<boolean> {
  return await deleteDocument(reportTemplatesTable, template.id);
}

// Report Fields
/**
 * @returns All the fields that are active in the database.
 */
export async function getAllFields(): Promise<ReportField[]> {
  let fields = await queryDocuments(fieldTable, [where("active", "==", true)]);
  console.log(fields);
  fields = fields ?? [];
  return fields as ReportField[]
}