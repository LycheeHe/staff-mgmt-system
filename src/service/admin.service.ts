import { AdminType, StaffType } from '@/type/param.type'
import LoggerService from './logger.service'
import ModelService from './model.service'
import Admin from '@/model/admin.model'
import { ResponseCode } from '@/type/code.type'
import ServiceResponse from '@/type/service-response.type'
import singletonDatabase from './database.service'
import Staff from '@/model/staff.model'

export default class AdminService extends ModelService {

  public async getList() {
    try {
      const list = await Admin.findAll({ attributes: { exclude: ['password'] }, })
      this.logger.info(`Got admin list from database successfully, length: ${list.length}`)
      return Promise.resolve(list)
    } catch (err) {
      this.logger.error(`Got error while getting admin list from database, error: ${err}`)
      return Promise.resolve([])
    }
  }
  // add one by one
  public async saveOne({ adminId, adminName }: AdminType) {
    try {
      const result = await Admin.create({ adminId, adminName, password: '123456' })
      this.logger.info('save admin successfully')
      return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      this.logger.error('fail to save admin, error: ' + error)
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
  }
  public async updateOne({ adminId, adminName }: AdminType) {
    try {
      const result = await Admin.update({ adminName }, { where: { adminId } })
      this.logger.info('update admin result: ' + JSON.stringify(result))
      return result[0] === 0 ? Promise.resolve(new ServiceResponse(ResponseCode.NO_ITEM)) : Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      this.logger.error('fail to save admin, error: ' + error)
      return Promise.resolve(new ServiceResponse(ResponseCode.UPDATE_ERROR))
    }
  }
  public async deleteAdmin(adminId: string) {
    try {
      const result = await Admin.destroy({ where: { adminId } })
      const code = result > 0 ? ResponseCode.SUCCESS : ResponseCode.NO_ITEM
      return Promise.resolve(new ServiceResponse(code))
    } catch (e) {
      this.logger.error(`Got error while delete data, error: ${e}`)
      return Promise.resolve(new ServiceResponse(ResponseCode.DELETE_ERROR))
    }
  }
  public async updatePassword(adminId: string, password: string) {
    try {
      const result = await Admin.update({ password }, { where: { adminId } })
      this.logger.info('update admin result: ' + JSON.stringify(result))
      return result[0] === 0 ? Promise.resolve(new ServiceResponse(ResponseCode.NO_ITEM)) : Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      this.logger.error('fail to save admin, error: ' + error)
      return Promise.resolve(new ServiceResponse(ResponseCode.UPDATE_ERROR))
    }
  }
  public async transferStaffAsAdmin({ staffId, staffName, desc }: StaffType) {
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      const result = await Admin.create({ adminId: staffId, adminName: staffName, desc, isStaff: true, password: '123456' }, { transaction })
      await Staff.update({ isAdmin: true }, { where: { staffId }, transaction })
      this.logger.info('transfer staff as admin successfully')
      await transaction.commit()
      return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      await transaction.rollback()
      this.logger.error('fail to save admin, error: ' + error)
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
  }
  public async cancelAdminForStaff(staffId) {
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      const result = await Admin.destroy({ where: { adminId: staffId }, transaction })
      await Staff.update({ isAdmin: false }, { where: { staffId }, transaction })
      this.logger.info('transfer staff as admin successfully')
      await transaction.commit()
      return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      await transaction.rollback()
      this.logger.error('fail to save admin, error: ' + error)
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
  }
}