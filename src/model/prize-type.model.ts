import { DataTypes } from 'sequelize'

import singletonDatabase from '@service/database.service'


const Position = singletonDatabase.getDatabase().define("prize_type", {
  prizeTypekey: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
  },
  prizeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prizeLevel: {
    type: DataTypes.INTEGER,
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
  { tableName: 'prize_type' }
)
export default Position