import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import staffRouter from './route/staff.route'
import deptRouter from './route/department.route'
import positionRouter from '@route/position.route'
import adminRouter from '@route/admin.route'
import singletonDatabase from '@service/database.service'

singletonDatabase.connect()
const app = new Koa()
app.use(bodyParser()) // parse the request body

app.use(staffRouter.routes())
app.use(staffRouter.allowedMethods())

app.use(deptRouter.routes())
app.use(deptRouter.allowedMethods())

app.use(positionRouter.routes())
app.use(positionRouter.allowedMethods())

app.use(adminRouter.routes())
app.use(adminRouter.allowedMethods())
app.listen(3888)