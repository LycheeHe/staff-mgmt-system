import { ActionType, useStaffContext } from './useStaffContext'
import HttpUrl from '../../request/url'
import { exportExcelData, importExcelData } from '../../util/excelUtil'
import requestUtil from '../../util/requestUtil'

const useStaffEvent = () => {
  const [state, dispatch] = useStaffContext()
  const { staffData, positionData, deptData } = state

  const changeTabKey = (tabKey) => {
    dispatch({ type: ActionType.STAFF, payload: { activeTabKey: tabKey } })
  }

  const getStaffList = async () => {
    const data = await requestUtil.get(HttpUrl.staff)
    const payload = { staffData: data, loading: false }
    dispatch({ type: ActionType.STAFF, payload })
  }

  const deleteOneStaff = async (item, i) => {
    if (typeof item.id === 'string' && item.id.startsWith('new-row')) {
      const newTableData = [...staffData]
      newTableData.splice(i, 1)
      dispatch({ type: ActionType.STAFF, payload: { staffData: newTableData } })
      return
    }
    const isSuccess = await requestUtil.delete(`${HttpUrl.staff}/${item.staffId}`)
    const payload = isSuccess ? { alertType: 'success', alertText: 'Delete successfully' } : { alertType: 'error', alertText: 'Failed to delete' }
    dispatch({ type: ActionType.STAFF, payload })
    isSuccess && await getStaffList()
  }
  const changeIsAdmin = async (value, item) => {
    const url = value === 'Y' ? HttpUrl.transferAdmin : `${HttpUrl.transferAdmin}/${item.staffId}`
    const isSuccess = value === 'Y' ? await requestUtil.put(url, item) : await requestUtil.delete(url)
    const payload = isSuccess ? { alertType: 'success', alertText: 'Amend admit access successfully' } : { alertType: 'error', alertText: 'Failed to amend admin access' }
    dispatch({ type: ActionType.STAFF, payload })
    await getStaffList()
  }
  const exportStaffList = () => {
    exportExcelData(staffData, 'staffId', 'Staff')
  }
  const importStaffList = async (e) => {
    const newData = await importExcelData(e)
    const newTableData = [...newData, ...staffData]
    dispatch({ type: ActionType.STAFF, payload: { staffData: newTableData } })
  }
  const exportPosition = () => {
    exportExcelData(positionData, 'positionKey', 'Position')
  }
  const importPosition = async (e) => {
    const newData = await importExcelData(e)
    const newTableData = [...newData, ...positionData]
    dispatch({ type: ActionType.STAFF, payload: { positionData: newTableData } })
  }
  const getUpdatedData = (url, actionStatus) => {
    if (url === HttpUrl.position) return positionData.filter(item => item.actionStatus === actionStatus)
    if (url === HttpUrl.staff) return staffData.filter(item => item.actionStatus === actionStatus)
    if (url === HttpUrl.dept) return deptData.filter(item => item.actionStatus === actionStatus)
  }

  const addOrUpdateMoreFn = async (url, actionStatus) => {
    const updatedData = getUpdatedData(url, actionStatus)
    if (updatedData.length <= 0) {
      dispatch({ type: ActionType.STAFF, payload: { alertText: `Can not ${actionStatus} empty data` } })
      return
    }
    const requestType = actionStatus === 'add' ? 'put' : 'post'
    const result = await requestUtil[requestType](url, updatedData)
    const payload = result ? { alertText: actionStatus + ' successfully', alertType: 'success' } : { alertText: 'Fail to ' + actionStatus }
    dispatch({ type: ActionType.STAFF, payload })
  }
  const addOrUpdateMoreStaff = async (actionStatus) => {
    await addOrUpdateMoreFn(HttpUrl.staff, actionStatus)
    await getStaffList()
  }
  const addOrUpdateMorePosition = async (actionStatus = 'add') => {
    await addOrUpdateMoreFn(HttpUrl.position, actionStatus)
    await getPositionList()
  }
  const deleteOnePosition = async (item, i) => {
    if (item.id) {
      const newTableData = [...positionData]
      newTableData.splice(i, 1)
      dispatch({ type: ActionType.STAFF, payload: { positionData: newTableData } })
      return
    }
    const isSuccess = await requestUtil.delete(`${HttpUrl.position}/${item.positionKey}`)
    const payload = isSuccess ? { alertType: 'success', alertText: 'Delete successfully' } : { alertType: 'error', alertText: 'Failed to delete' }
    dispatch({ type: ActionType.STAFF, payload })
    await getPositionList()
  }
  const getPositionList = async () => {
    const data = await requestUtil.get(HttpUrl.position)
    const payload = { positionData: data, loading: false }
    dispatch({ type: ActionType.STAFF, payload })
  }
  const changePositionData = async (value, key, i) => {
    const newTableData = [...positionData]
    if (key === 'deptKey') {
      newTableData[i].deptKey = value.id
      newTableData[i].deptName = value.text
    } else {
      newTableData[i][key] = value
    }
    newTableData[i].actionStatus = 'update'
    dispatch({ type: ActionType.STAFF, payload: { positionData: newTableData } })
  }
  const getDeptList = async () => {
    const result = await requestUtil.get(HttpUrl.dept)
    dispatch({ type: ActionType.STAFF, payload: { deptData: result } })
  }
  const deleteOneDept = async ({ deptKey }, i) => {
    const result = await requestUtil.delete(`${HttpUrl.dept}/${deptKey}`)
    const payload = result ? { alertText: 'Delete successfully', alertType: 'success' } : { alertText: 'Fail to delete' }
    dispatch({ type: ActionType.STAFF, payload })
    await getDeptList()
  }
  const addOrUpdateMoreDept = async (actionStatus = 'add') => {
    await addOrUpdateMoreFn(HttpUrl.dept, actionStatus)
    await getDeptList()
  }

  const importDept = async (e) => {
    const newData = await importExcelData(e)
    const newTableData = [...newData, ...deptData]
    dispatch({ type: ActionType.STAFF, payload: { deptData: newTableData } })
  }
  const exportDept = () => {
    exportExcelData(deptData, 'deptKey', 'Department')
  }
  const changeDeptData = (e, i) => {
    const { target: { value } } = e
    const newTableData = [...deptData]
    newTableData[i].deptName = value
    newTableData[i].actionStatus = 'update'
    dispatch({ type: ActionType.STAFF, payload: { deptData: newTableData } })
  }
  const getDropdownDeptList = async () => {
    const result = await requestUtil.get(HttpUrl.dropdown.dept)
    dispatch({ type: ActionType.STAFF, payload: { deptDropdownList: result } })
  }
  const getDropdownPositionList = async () => {
    const result = await requestUtil.get(HttpUrl.dropdown.position)

    dispatch({ type: ActionType.STAFF, payload: { positionDropdownList: result } })
  }
  const changeStaffData = (value, key, i) => {
    const newTableData = [...staffData]
    if (key === 'positionKey') {
      newTableData[i].positionKey = value.id
      newTableData[i].position.positionTitle = value.text
      newTableData[i].position.positionLevel = value.subText
    } else {
      newTableData[i][key] = value
    }

    newTableData[i].actionStatus = 'update'
    dispatch({ type: ActionType.STAFF, payload: { staffData: newTableData } })

  }
  return {
    changeTabKey,
    getStaffList,
    getPositionList,
    deleteOneStaff,
    deleteOnePosition,
    changeIsAdmin,
    exportPosition,
    importPosition,
    getDeptList,
    deleteOneDept,
    addOrUpdateMoreDept,
    importDept,
    exportDept,
    changeDeptData,
    addOrUpdateMorePosition,
    changePositionData,
    addOrUpdateMoreStaff,
    getDropdownDeptList,
    getDropdownPositionList,
    changeStaffData,
    exportStaffList,
    importStaffList
  }
}

export default useStaffEvent