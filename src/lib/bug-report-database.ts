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
export function getUserByUserId () : User {
}
export function createUser () {
  getDocument("users", "CnJWu0shibsxflDPPt1j").then((data) => {
    console.log("Here");
    
    console.log(data)
  }).then(() => {
    return {
      id: "234",
      role: "23"
    }
  })
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