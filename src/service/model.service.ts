import DatabaseStatus from '@/model/database-status'
import singletonDatabase from './database.service'
import LoggerService from '@/service/logger.service'
import { Model } from 'sequelize'
import Department from '@/model/department.model'
import Staff from '@/model/staff.model'
import Admin from '@/model/admin.model'
import Position from '@/model/position.model'
import PrizeResult from '@/model/prize-result.model'
import PrizeType from '@/model/prize-type.model'
import ResultPool from '@/model/result-pool.model'
import { DepartmentType } from '@/type/param.type'

export type LuckyDrawModel = typeof Department
  | typeof Staff
  | typeof Admin
  | typeof Position
  | typeof PrizeResult
  | typeof PrizeType
  | typeof ResultPool

export type LuckyDrawType = DepartmentType

export default class ModelService {
  public logger = new LoggerService(ModelService.name)
  constructor() { }
  public async findPartialFields(model: LuckyDrawModel, keys) {

  }
  public async findAllWithLog(model: LuckyDrawModel) {
    const modelType = model.name
    if (singletonDatabase.getStatus() !== DatabaseStatus.SYNCED) {
      this.logger.info(`Database is syncing, status: ${singletonDatabase.getStatus()}`)
      return Promise.resolve([])
    }
    try {
      const dependendList = []
      if (modelType === 'position') {
        dependendList.push({ model: Department, require: true, attributes: ['deptKey', 'deptName'] })
      }
      if (modelType === 'staff') {
        dependendList.push({
          model: Position,
          attributes: ['positionKey', 'positionTitle', 'positionLevel'],
          include: [{ model: Department, require: true, attributes: ['deptKey', 'deptName'] }]
        })
        // dependendList.push()
      }

      const list: Array<Model<LuckyDrawModel, LuckyDrawModel>> = await model.findAll({ include: dependendList })
      this.logger.info(`Got ${modelType} list from database successfully, length: ${list.length}`)
      return Promise.resolve(list)
    } catch (err) {
      this.logger.error(`Got error while getting ${modelType} list from database, error: ${err}`)
      return Promise.resolve([])
    }
  }
  public async saveMoreWithLog(model: LuckyDrawModel, list: Array<any>) {
    const modelType = model.name
    this.logger.info(`Going to save multiple list into database, table is: ${modelType}`)
    const transaction = await singletonDatabase.getDatabase().transaction()
    try {
      const result = await model.bulkCreate(list, { transaction })
      await transaction.commit()
      return result
    } catch (e) {
      await transaction.rollback()
      this.logger.error(`Got error while saving multiple list, error: ${e}`)
      return Promise.resolve([])
    }
  }
  public async deleteWithLog(model: LuckyDrawModel, id: string) {
    const modelType = model.name

    try {
      const result = await model.destroy({ where: { [`${modelType === 'department' ? 'dept' : modelType}Key`]: id } })
      return result
    } catch (e) {
      this.logger.error(`Got error while delete data, error: ${e}`)
      return Promise.resolve(-1)
    }
  }
}