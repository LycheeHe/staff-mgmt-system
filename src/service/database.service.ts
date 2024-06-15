import { Sequelize } from 'sequelize'
import LoggerService from './logger.service'
import DatabaseStatus from '@/model/database-status'

const options = {
  host: 'localhost',
  port: 5432,
  localAddress: '',
  debug: false,
  user: 'postgres',
  password: '',
  database: 'lucky_draw_db',
  connectTimeout: 20000,
}


class DatabaseService {
  private logger = new LoggerService(DatabaseService.name)
  private sequelize: Sequelize
  private status: DatabaseStatus = DatabaseStatus.CLOSED

  constructor(options) {
    this.sequelize = new Sequelize(options.database, options.user, options.password, {
      dialect: 'postgres',
      dialectOptions: options,
      // logging: (query, timing?: number) => {
      //   this.logger.info(`Query executed in ${timing} ms: ${query}`)
      // },
    })
  }
  private setStatus(status: DatabaseStatus) {
    this.status = status
  }
  public getStatus() { return this.status }
  public getDatabase() { return this.sequelize }
  public async connect() {
    if (this.status === DatabaseStatus.CONNECTED
      || this.status === DatabaseStatus.CONNECTING
      || this.status === DatabaseStatus.SYNCED) {
      this.logger.info(`Database is connected/connecting`)
      return
    }
    try {
      this.setStatus(DatabaseStatus.CONNECTING)
      await this.sequelize.authenticate()
      this.logger.info(`Connected with database successfully`)
      this.setStatus(DatabaseStatus.CONNECTED)

      await this.syncModel()
    } catch (e) {
      this.setStatus(DatabaseStatus.FAILED_CONNECTED)
      this.logger.error(`Error happened while connecting with database, error: ${e}`)
    }
  }
  public async syncModel() {
    require('@/model/department.model')
    require('@/model/position.model')
    require('@/model/staff.model')
    require('@/model/admin.model')
    require('@/model/prize-result.model')
    require('@/model/prize-type.model')
    require('@/model/result-pool.model')
    await this.sequelize.sync()
    this.setStatus(DatabaseStatus.SYNCED)
    this.logger.info('Sync all models successfully')
  }
  public async close() {
    try {
      await this.sequelize.close()
      this.setStatus(DatabaseStatus.CLOSED)
      this.logger.info('Closed database successfully')
    } catch (e) {
      this.setStatus(DatabaseStatus.FAILED_CLOSED)
      this.logger.error(`Error happened while closing with database, error: ${e}`)
    }
  }
}

const singletonDatabase = new DatabaseService(options)
export default singletonDatabase