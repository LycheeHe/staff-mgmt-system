import { useEffect, useState } from 'react'
import ExcelActions from '../../component/ExcelActions'
import Table, { TBody, THead, Td, Th, Tr } from '../../component/Table'
import { useStaffContext } from './useStaffContext'
import useStaffEvent from './useStaffEvent'
import { SearchInput, Tooltip } from '../../component'
import classNames from 'classnames'
import Dropdown from '../../component/Dropdown'

const PositionTab = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const [state] = useStaffContext()
  const { loading, positionData, deptDropdownList } = state
  const { getDropdownDeptList, importPosition, exportPosition, addOrUpdateMorePosition, deleteOnePosition, getPositionList, changePositionData, searchDept } = useStaffEvent()

  const actionFn = () => {
    addOrUpdateMorePosition(isUpdating ? 'update' : 'add')
  }
  useEffect(() => {
    const fn = async () => {
      await getPositionList()
      await getDropdownDeptList()
    }
    fn()
  }, [])
  return (
    <>
      <ExcelActions onExport={exportPosition} onImport={importPosition} />
      <Table loading={loading}>
        <THead>
          <Tr>
            <Th>Position ID</Th>
            <Th>Position Level</Th>
            <Th>Position</Th>
            <Th>Dept</Th>
            <Th actionCell>
              Action
              <button onClick={actionFn}>Save</button>
            </Th>
          </Tr>
        </THead>
        <TBody>
          {positionData.map((item, i) => <Tr className={item.actionStatus && `table-${item.actionStatus}-row`} key={item.id || item.positionKey}>
            <Td>{item.positionKey}</Td>
            <Td>{item.positionLevel}</Td>
            <Td editable text={item.positionTitle} onChange={e => {
              !isUpdating && setIsUpdating(true)
              changePositionData(e.target.value, 'positionTitle', i)
            }} />
            <Td editable>
              <Dropdown selectedId={item.deptKey} list={deptDropdownList} selectedItemId={item.deptKey} onSelect={(item) => changePositionData(item, 'deptKey', i)} />
            </Td>
            <Td><Tooltip direction='left' isDeleteAction><button onClick={() => deleteOnePosition(item, i)}>Delete</button></Tooltip> </Td>
          </Tr>)}
        </TBody>
      </Table>
    </>
  )
}

export default PositionTab