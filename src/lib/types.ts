export type User = {
  id: string
  role: string
}

export type Report = {
  id: string
  userId: string
  date: string
  name: string
  fields: Array<ReportField>
}

export type ReportTemplate = {
  id: string
  userId: string
  name: string
  fields: Array<ReportField>
}

export type ReportField = {
  id: string
  type: string
  name: string
  value: string
}