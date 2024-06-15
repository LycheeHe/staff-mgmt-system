import { AdminType, StaffType } from '@/type/param.type'
import Router from '@koa/router'
import LoggerService from '@service/logger.service'
import AdminService from '@service/admin.service'
import { Next, ParameterizedContext } from 'koa'

const adminRouter = new Router()
const adminService = new AdminService()
const logger = new LoggerService(__filename)

adminRouter
  .get('/admin', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to get admin list')
    const res = await adminService.getList()
    ctx.body = res
    await next()
  })
  .put('/admin', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to save admin user')
    const user = ctx.request.body as AdminType
    const res = await adminService.saveOne(user)
    ctx.body = res
    await next()
  })
  .post('/admin', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to update admin list: ' + JSON.stringify(ctx.request.body))
    const user = ctx.request.body as AdminType
    const res = await adminService.updateOne(user)
    ctx.body = res
    await next()
  })
  .delete('/admin/:adminId', async (ctx: ParameterizedContext, next: Next) => {
    const adminId = ctx.params.adminId
    logger.info('Going to delete admin: ' + adminId)
    logger.info(JSON.stringify(adminId))
    const res = await adminService.deleteAdmin(adminId)
    ctx.body = res
    await next()
  })

adminRouter
  .delete('/admin/transfer/:staffId', async (ctx: ParameterizedContext, next: Next) => {
    const staffId = ctx.params.staffId
    logger.info('Going to delete admin: ' + staffId)
    const res = await adminService.cancelAdminForStaff(staffId)
    ctx.body = res
    await next()
  })
  .put('/admin/transfer', async (ctx: ParameterizedContext, next: Next) => {
    const user = ctx.request.body as StaffType

    logger.info('Going to transfer staff as admin: ' + JSON.stringify(user))
    const res = await adminService.transferStaffAsAdmin(user)
    ctx.body = res
    await next()
  })
export default adminRouter