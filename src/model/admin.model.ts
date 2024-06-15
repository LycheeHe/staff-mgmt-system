import { DataTypes, Sequelize } from 'sequelize'

import singletonDatabase from '@service/database.service'

const Admin = singletonDatabase.getDatabase().define("admin", {
  adminKey: { // to be primary key and foreign key
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  adminName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
  { tableName: 'admin' }
)
export default Admin