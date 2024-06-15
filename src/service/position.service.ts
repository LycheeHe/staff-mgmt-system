import Position from '@/model/position.model'
import ModelService from './model.service'
import { PositionType } from '@/type/param.type'
import singletonDatabase from './database.service'
import ServiceResponse from '@/type/service-response.type'
import { ResponseCode } from '@/type/code.type'
import Department from '@/model/department.model'

export default class PositionService extends ModelService {

  public async getList() {
    return await this.findAllWithLog(Position)
  }
  public async getDropdownList() {
    try {
      const list = await Position.findAll({
        attributes: [['positionKey', 'id'], ['positionTitle', 'text'], ['positionLevel', 'subText']],
        include: { model: Department, attributes: ['deptKey', 'deptName'] },
        order: [['positionLevel', 'DESC']],
      })
      this.logger.info(`Got position dropdown list from database successfully, length: ${list.length}`)
      return Promise.resolve(list)
    } catch (err) {
      this.logger.error(`Got error while getting position dropdown list from database, error: ${err}`)
      return Promise.resolve([])
    }
  }
  public async saveMore(list: Array<PositionType>) {
    const modelList = this.getPositionList(list)
    if (modelList.length === 0) {
      return Promise.resolve(new ServiceResponse(ResponseCode.NO_VALID_LIST))
    }
    const result = await this.saveMoreWithLog(Position, modelList)
    if (result.length === 0) {
      this.logger.error('Failed to save data')
      return Promise.resolve(new ServiceResponse(ResponseCode.SAVE_ERROR))
    }
    this.logger.info('Save data successfuly')
    return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
  }
  public async updateMore(list: PositionType[]) {
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      for (let i = 0; i < list.length; i++) {
        const { deptKey, positionKey, positionLevel, positionTitle, desc } = list[i]
        const updateRow: Partial<PositionType> = { positionKey }
        if (deptKey) updateRow.deptKey = deptKey
        if (positionLevel) updateRow.positionLevel = positionLevel
        if (positionTitle) updateRow.positionTitle = positionTitle
        if (desc) updateRow.desc = desc
        await Position.update(updateRow, { where: { positionKey }, transaction })
      }
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      this.logger.error(`Error during individualized bulk update:${error}`)
      return Promise.reject(new ServiceResponse(ResponseCode.UPDATE_ERROR))
    }
    this.logger.info('Update position successfully')
    return Promise.resolve(new ServiceResponse(ResponseCode.SUCCESS))
  }
  public async deletePosition(positionKey) {
    const result = await this.deleteWithLog(Position, positionKey)
    const code = result > 0 ? ResponseCode.SUCCESS : result === 0 ? ResponseCode.NO_ITEM : ResponseCode.DELETE_ERROR
    return Promise.resolve(new ServiceResponse(code))
  }
  private getPositionList(list: Array<PositionType>) {
    const validList = []
    for (let i = 0; i < list.length; i++) {
      const { deptKey, desc, positionLevel, positionTitle } = list[i]
      if (deptKey && positionLevel && positionTitle) {
        validList.push({ deptKey, desc, positionLevel, positionTitle })
      }
    }
    return validList
  }

}