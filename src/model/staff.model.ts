import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'
import Department from './department.model'
import Position from './position.model'

const Staff = singletonDatabase.getDatabase().define(
  "staff",
  {
    staffKey: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    staffId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    staffName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    positionKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Position,
        key: 'positionKey'
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
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
  { tableName: 'staff' }
)
Staff.belongsTo(Position, { foreignKey: 'positionKey' })
export default Staff