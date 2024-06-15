import { PositionType } from '@/type/param.type'
import Router from '@koa/router'
import LoggerService from '@service/logger.service'
import PositionService from '@service/position.service'
import { Next, ParameterizedContext } from 'koa'

const positionRouter = new Router()
const positionService = new PositionService()
const logger = new LoggerService(__filename)

positionRouter
  .get('/position', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to get position list')
    const res = await positionService.getList()
    ctx.body = res
    await next()
  })
  .put('/position', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to save position list')
    const list = ctx.request.body as PositionType[]
    const res = await positionService.saveMore(list)
    ctx.body = res
    await next()
  })
  .post('/position', async (ctx: ParameterizedContext, next: Next) => {
    logger.info('Going to update position list: ' + JSON.stringify(ctx.request.body))
    const list = ctx.request.body as PositionType[]
    const res = await positionService.updateMore(list)
    ctx.body = res
    await next()
  })
  .delete('/position/:positionId', async (ctx: ParameterizedContext, next: Next) => {
    const positionId = ctx.params.positionId
    logger.info('Going to delete position: ' + positionId)
    logger.info(JSON.stringify(positionId))
    const res = await positionService.deletePosition(positionId)
    ctx.body = res
    await next()
  })
positionRouter.get('/dropdown/position', async (ctx: ParameterizedContext, next: Next) => {
  const res = await positionService.getDropdownList()
  ctx.body = res
  await next()
})
export default positionRouter