import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'
import Position from './position.model'
import Staff from './staff.model'

const Department = singletonDatabase.getDatabase().define(
  "department",
  {
    deptKey: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    deptName: {
      type: DataTypes.STRING,
      allowNull: false
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
  { tableName: 'department' }
)

export default Department