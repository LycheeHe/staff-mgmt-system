import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'

const Staff = singletonDatabase.getDatabase().define(
  "result_pool",
  {
    resultkey: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    staffName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    desc: {
      type: DataTypes.STRING
    },
    createBy: {
      type: DataTypes.STRING,
      defaultValue: 'root'
    },
    updateBy: {
      type: DataTypes.STRING
    }
  },
  { tableName: 'result_pool' }
)
export default Staff