import Staff from '@/model/staff.model'
import ModelService from './model.service'
import { StaffType } from '@/type/param.type'
import ServiceResponse from '@/type/service-response.type'
import { ResponseCode } from '@/type/code.type'
import singletonDatabase from './database.service'

export default class StaffService extends ModelService {

  public async getList() {
    return await this.findAllWithLog(Staff)
  }
  public async saveMore(list: Array<StaffType>) {
    const modelList = this.getStaffList(list)
    if (modelList.length === 0) {
      this.logger.info('Valid staff list is empty')
      return Promise.resolve(new ServiceResponse(ResponseCode.NO_VALID_LIST))
    }
    const result = await this.saveMoreWithLog(Staff, modelList)
    if (result.length === 0) {
      this.logger.error('failed to save the list: ' + JSON.stringify(modelList))
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
    this.logger.info('successfully saved the data')
    return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
  }
  public async updateMore(list: Array<StaffType>) {
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      for (let i = 0; i < list.length; i++) {
        const { deptKey, positionKey, staffName, staffKey, desc } = list[i]
        const updateRow: Partial<StaffType> = { staffKey }
        if (deptKey) updateRow.deptKey = deptKey
        if (staffName) updateRow.staffName = staffName
        if (positionKey) updateRow.positionKey = positionKey
        if (desc) updateRow.desc = desc
        await Staff.update(updateRow, { where: { staffKey }, transaction })
      }
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      this.logger.error(`Error during individualized bulk update:${error}`)
      return Promise.reject(new ServiceResponse(ResponseCode.UPDATE_ERROR))
    }
    this.logger.info('Update staff successfully')
    return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
  }
  public async deleteStaff(staffId: string) {
    const result = await this.deleteWithLog(Staff, staffId)
    const code = result > 0 ? ResponseCode.SUCCESS : result === 0 ? ResponseCode.NO_ITEM : ResponseCode.DELETE_ERROR
    return Promise.resolve(new ServiceResponse(code))
  }
  private getStaffList(list: Array<StaffType>) {
    const validList = []
    for (let i = 0; i < list.length; i++) {
      const { staffId, staffName, positionKey, deptKey, desc, isAdmin } = list[i]
      if (staffId && staffName && positionKey && deptKey) {
        validList.push({ staffId, staffName, positionKey, deptKey, desc, isAdmin: Boolean(isAdmin) })
      }
    }
    return validList
  }

}