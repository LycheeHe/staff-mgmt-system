const prefix = '/api'
const HttpUrl = {
  dropdown: {
    position: prefix + '/dropdown/position',
    dept: prefix + '/dropdown/dept',
    getStaffById: prefix + '/dropdown/getStaffById',
    getStaffByName: prefix + '/dropdown/getStaffByName',
    getGiffByLevel: prefix + '/dropdown/getGiffByLevel',
    getPositionByLevel: prefix + '/dropdown/getPositionByLevel',
    getPositionByTitle: prefix + '/dropdown/getPositionByTitle'

  },
  staff: prefix + '/staff',
  position: prefix + '/position',
  admin: prefix + '/admin',
  transferAdmin: prefix + '/admin/transfer',
  dept: prefix + '/dept'

}
export default HttpUrl