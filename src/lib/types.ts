export type User = {
  authId: string
  role: string
  id: string
}

export type Report = {
  id: string
  userId: string
  date: number
  name: string
  reportTemplate: string
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
  type: FieldType
  name: string
  value: string
}

export enum FieldType {
  text = "text",
  switch = "switch"
}