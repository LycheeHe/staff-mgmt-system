import Department from '@/model/department.model'
import ModelService from './model.service'
import { DepartmentType } from '@/type/param.type'
import singletonDatabase from './database.service'
import ServiceResponse from '@/type/service-response.type'
import { ResponseCode } from '@/type/code.type'

export default class DepartmentService extends ModelService {

  public async getList() {
    return await this.findAllWithLog(Department)
  }
  public async getDropdownList() {
    try {
      const list = await Department.findAll({
        attributes: [['deptKey', 'id'], ['deptName', 'text']],
        order: [['deptName', 'DESC']],
      })
      this.logger.info(`Got dept dropdown list from database successfully, length: ${list.length}`)
      return Promise.resolve(list)
    } catch (err) {
      this.logger.error(`Got error while getting dept dropdown list from database, error: ${err}`)
      return Promise.resolve([])
    }
  }
  public async saveMore(list: Array<DepartmentType>) {
    const modelList = this.getDeptList(list)
    if (modelList.length === 0) {
      this.logger.info('valid dept list is empty')
      return Promise.resolve(new ServiceResponse(ResponseCode.NO_VALID_LIST))
    }
    const result = await this.saveMoreWithLog(Department, modelList)
    if (result.length === 0) {
      this.logger.error('failed to save the list: ' + JSON.stringify(list))
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
    this.logger.info('successfully saved the data')
    return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
  }
  public async updateMore(list: DepartmentType[]) {
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      for (let i = 0; i < list.length; i++) {
        const { deptName, desc, deptKey } = list[i]
        const updateRow: Partial<DepartmentType> = {}
        if (deptName) updateRow.deptName = deptName
        if (desc) updateRow.desc = desc
        await Department.update(updateRow, { where: { deptKey }, transaction })
      }
      await transaction.commit()
      this.logger.info('Update dept successfully')
      return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
    } catch (error) {
      await transaction.rollback()
      this.logger.error(`Error during individualized bulk update:${error}`)
      return Promise.reject(new ServiceResponse(ResponseCode.UPDATE_ERROR))
    }
  }
  public async deleteDept(deptKey: string) {
    const result = await this.deleteWithLog(Department, deptKey)
    const code = result > 0 ? ResponseCode.SUCCESS : result === 0 ? ResponseCode.NO_ITEM : ResponseCode.DELETE_ERROR
    return Promise.resolve(new ServiceResponse(code))
  }
  private getDeptList(list: Array<DepartmentType>) {
    const validList = []
    for (let i = 0; i < list.length; i++) {
      const { deptName, desc } = list[i]
      if (deptName) {
        validList.push({ deptName, desc })
      }
    }
    return validList
  }
}