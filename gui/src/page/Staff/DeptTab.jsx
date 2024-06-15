import { useEffect, useState } from 'react'
import ExcelActions from '../../component/ExcelActions'
import Table, { TBody, THead, Td, Th, Tr } from '../../component/Table'
import { useStaffContext } from './useStaffContext'
import useStaffEvent from './useStaffEvent'
import { Tooltip } from '../../component'
import classNames from 'classnames'

const DeptTab = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [state] = useStaffContext()
  const { deptData } = state
  const { getDeptList, importDept, exportDept, deleteOneDept, changeDeptData, addOrUpdateMoreDept } = useStaffEvent()

  const actionFn = () => {
    addOrUpdateMoreDept(isUpdating ? 'update' : 'add')
  }
  useEffect(() => {
    const fn = async () => {
      await getDeptList()
    }
    fn()
  }, [])


  return (
    <>
      <ExcelActions onExport={exportDept} onImport={importDept} />
      <Table>
        <THead>
          <Tr>
            <Th>Dept ID</Th>
            <Th>Dept</Th>
            <Th actionCell>
              Action
              <button onClick={actionFn}>Save</button>
            </Th>
          </Tr>
        </THead>
        <TBody>
          {deptData.map((item, i) => <Tr className={item.actionStatus === 'add' && 'table-add-row'} key={item.id || item.deptKey}>
            <Td>{item.deptKey}</Td>
            <Td className={classNames(item.actionStatus === 'update' && 'table-update-cell')} editable text={item.deptName} onChange={e => {
              !isUpdating && setIsUpdating(true)
              changeDeptData(e, i)
            }} />
            <Td><Tooltip direction='left' isDeleteAction><button onClick={() => deleteOneDept(item, i)}>Delete</button></Tooltip> </Td>
          </Tr>)}
        </TBody>
      </Table>
    </>
  )
}

export default DeptTab