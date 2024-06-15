import { useEffect, useState } from 'react'
import { Table, TBody, THead, Td, Th, Tr, ExcelActions, YesOrNo, Tooltip } from '../../component'
import { useStaffContext } from './useStaffContext'
import useStaffEvent from './useStaffEvent'
import classNames from 'classnames'
import { transferTime } from '../../util/timeUtil'
import Dropdown from '../../component/Dropdown'

const StaffTab = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [state] = useStaffContext()
  const { loading, staffData, positionDropdownList } = state

  const { getStaffList, changeIsAdmin, addOrUpdateMoreStaff, getDropdownPositionList, changeStaffData, exportStaffList, importStaffList } = useStaffEvent()

  const actionFn = () => {
    addOrUpdateMoreStaff(isUpdating ? 'update' : 'add')
  }
  useEffect(() => {
    const fn = async () => {
      await getStaffList()
      await getDropdownPositionList()
    }
    fn()
  }, [])
  return (
    <>
      <ExcelActions onExport={exportStaffList} onImport={importStaffList} />
      <Table loading={loading}>
        <THead>
          <Tr>
            <Th>Staff ID</Th>
            <Th>Name</Th>
            <Th>Is Admin</Th>
            <Th>Position</Th>
            <Th>Position Level</Th>
            <Th>Dept</Th>
            <Th>Time to join</Th>
            <Th>Time to update</Th>
            <Th actionCell>
              Action
              <button onClick={actionFn}>Save</button>
            </Th>
          </Tr>
        </THead>
        <TBody>
          {staffData.map((item, i) => <Tr className={classNames(item.actionStatus && `table-${item.actionStatus}-row`)} key={item.id}>
            <Td>{item.staffId}</Td>
            <Td editable text={item.staffName} onChange={e => {
              !isUpdating && setIsUpdating(true)
              changeStaffData(e.target.value, 'staffName', i)
            }} />
            <Td editable>
              <Tooltip text={`Make ${item.staffName} as admin or not`}><YesOrNo value={item.isAdmin ? 'Y' : 'N'} onAction={(value) => changeIsAdmin(value, item)} /></Tooltip>
            </Td>

            <Td editable>
              <Dropdown selectedId={item.positionKey} list={positionDropdownList} selectedItemId={item.positionKey} onSelect={(item) => {
                !isUpdating && setIsUpdating(true)
                changeStaffData(item, 'positionKey', i)
              }} />
            </Td>
            <Td>{item.position?.positionLevel}</Td>
            <Td>
              {item.position?.department?.deptName}
            </Td>
            <Td>{transferTime(item.createdAt)}</Td>
            <Td>{transferTime(item.updatedAt)}</Td>
            <Td>
              <Tooltip isDeleteAction direction='left'><button onClick={() => deleteOneStaff(item, i)}>Delete</button></Tooltip>
            </Td>
          </Tr>)}
        </TBody>
      </Table>
    </>
  )
}

export default StaffTab