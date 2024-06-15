import { StaffType } from '@/type/param.type'
import Router from '@koa/router'
import LoggerService from '@service/logger.service'
import StaffService from '@service/staff.service'
import { Next, ParameterizedContext } from 'koa'

const staffRouter = new Router()
const staffService = new StaffService()
const logger = new LoggerService(__filename)

staffRouter
  .get('/staff', async (ctx: ParameterizedContext, next: Next) => {
    const res = await staffService.getList()
    ctx.body = res
    await next()
  })
  .put('/staff', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to save position list')
    const list = ctx.request.body as StaffType[]
    const res = await staffService.saveMore(list)
    ctx.body = res
    await next()
  })
  .post('/staff', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to save position list')
    const list = ctx.request.body as StaffType[]
    const res = await staffService.updateMore(list)
    ctx.body = res
    await next()
  })

export default staffRouter