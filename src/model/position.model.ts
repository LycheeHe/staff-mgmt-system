import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'
import Department from './department.model'

const Position = singletonDatabase.getDatabase().define("position", {
  positionKey: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
  },
  positionTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  positionLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deptKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'deptKey'
    }
  },
  desc: {
    type: DataTypes.STRING
  },
  createBy: {
    type: DataTypes.STRING
  },
  updateBy: {
    type: DataTypes.STRING
  }
},
  { tableName: 'position' }
)
Position.belongsTo(Department, { foreignKey: 'deptKey' })
export default Position