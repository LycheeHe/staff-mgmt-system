import { useAdminContext, ActionType } from './useAdminContext'
import HttpUrl from '../../request/url'
import { exportExcelData, importExcelData } from '../../util/excelUtil'
import requestUtil from '../../util/requestUtil'

const useAdminEvent = () => {

  const [state, dispatch] = useAdminContext()
  const { tableData } = state

  const getAdminList = async () => {
    const data = await requestUtil.get(HttpUrl.admin)
    dispatch({ type: ActionType.ADMIN, payload: { tableData: data, loading: false } })
  }
  const deleteAdmin = async (item) => {
    const url = item.isStaff ? HttpUrl.transferAdmin : HttpUrl.admin
    const isSuccess = await requestUtil.delete(`${url}/${item.adminId}`)
    const payload = isSuccess ? { alertType: 'success', alertText: 'Delete successfully' } : { alertType: 'error', alertText: 'Failed to delete' }
    dispatch({ type: ActionType.ADMIN, payload })
    isSuccess && await getAdminList()
  }
  const saveOrUpdateOne = async (item) => {
    const method = item.id ? 'put' : 'post'
    const isSuccess = await requestUtil[method](HttpUrl.admin, item)
    const payload = isSuccess ? { alertType: 'success', alertText: 'Save/Update successfully' } : { alertType: 'error', alertText: 'Failed to save/update' }
    dispatch({ type: ActionType.ADMIN, payload })
    isSuccess && await getAdminList()
  }
  const addOneRow = () => {
    const newTableData = [...tableData]
    if (newTableData[0].actionStatus === 'add') {
      dispatch({ type: ActionType.ADMIN, payload: { alertText: 'Can add an admin on the same time', alertType: 'warn' } })
      return
    }
    newTableData.unshift({ id: 'new-row-1', adminName: '', isStaff: false, actionStatus: 'add' })
    dispatch({ type: ActionType.ADMIN, payload: { tableData: newTableData } })
  }
  const changeAdmin = ({ target: { value } }, key, i) => {
    const newTableData = [...tableData]
    newTableData[i][key] = value
    dispatch({ type: ActionType.ADMIN, payload: { tableData: newTableData } })

  }
  const changePassowrd = (item) => {

  }
  return {
    deleteAdmin,
    getAdminList,
    saveOrUpdateOne,
    addOneRow,
    changeAdmin,
    changePassowrd
  }
}
export default useAdminEvent