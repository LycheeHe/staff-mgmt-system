import Router from '@koa/router'
import LoggerService from '@service/logger.service'
import DepartmentService from '@service/department.service'
import { Next, ParameterizedContext } from 'koa'
import { DepartmentType } from '@/type/param.type'

const departmentRouter = new Router()
const service = new DepartmentService()
const logger = new LoggerService(__filename)

departmentRouter
  .get('/dept', async (ctx: ParameterizedContext, next: Next) => {
    const res = await service.getList()
    ctx.body = res
    await next()
  })
  .put('/dept', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to save dept list: ' + JSON.stringify(ctx.request.body))
    const deptList = ctx.request.body as DepartmentType[]
    const res = await service.saveMore(deptList)
    ctx.body = res
    await next()
  })
  .post('/dept', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to update dept list: ' + JSON.stringify(ctx.request.body))
    const deptList = ctx.request.body as DepartmentType[]
    const res = await service.updateMore(deptList)
    ctx.body = res
    await next()
  })
  .delete('/dept/:deptKey', async (ctx: ParameterizedContext, next: Next) => {
    const deptKey = ctx.params.deptKey
    logger.info('Going to delete dept: ' + deptKey)
    logger.info(JSON.stringify(deptKey))
    const res = await service.deleteDept(deptKey)
    ctx.body = res
    await next()
  })

departmentRouter.get('/dropdown/dept', async (ctx: ParameterizedContext, next: Next) => {
  const res = await service.getDropdownList()
  ctx.body = res
  await next()
})
export default departmentRouter