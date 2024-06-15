export type NullOrString = null | string
export type DepartmentType = {
  deptKey: string
  deptName: string
  desc: string
}

export type PositionType = {
  positionKey: string
  positionTitle: string
  positionLevel: number
  deptKey: string
  desc: string
  // createBy: NullOrString
  // updateBy: NullOrString
  // createdAt: NullOrString
  // updatedAt: NullOrString
  department: { deptKey: string, deptName: string }
}
export type StaffType = {
  staffKey: string
  staffId: string
  staffName: string
  isAdmin: boolean
  desc: string
  positionKey: number
  deptKey: string
}

export type AdminType = {
  adminKey: string
  adminId: string
  adminName: string
  isStaff: boolean
  password: string
  desc: string
}