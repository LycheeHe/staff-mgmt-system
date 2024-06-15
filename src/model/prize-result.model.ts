import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'
import PrizeTypeModel from './prize-type.model'
import StaffModel from './staff.model'
const PrizeResult = singletonDatabase.getDatabase().define("prize_result", {
  prizeResultkey: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING
  },
  prizeTypeKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PrizeTypeModel,
      key: 'prizeTypekey'
    }
  },
  staffKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StaffModel,
      key: 'staffKey'
    }
  },
  createBy: {
    type: DataTypes.STRING
  },
  updateBy: {
    type: DataTypes.STRING
  }
},
  { tableName: 'prize_result' }
)

export default PrizeResult