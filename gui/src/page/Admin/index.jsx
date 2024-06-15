import { Table, TBody, THead, Td, Th, Tr, ExcelActions, Alert, Tooltip, Tip } from '../../component'
import useAdminEvent from './useAdminEvent'
import { useAdminContext } from './useAdminContext'
import { useEffect } from 'react'
import classNames from 'classnames'

const Admin = () => {
  const [state] = useAdminContext()
  const { tableData, loading, alertText, alertType } = state
  const {
    deleteAdmin,
    getAdminList,
    saveOrUpdateOne,
    addOneRow,
    changeAdmin,
    changePassowrd } = useAdminEvent()

  useEffect(() => {
    const fn = async () => {
      await getAdminList()
    }
    fn()
  }, [])
  return (
    <main className='admin-main'>
      <Alert text={alertText} type={alertType} />
      <Tip />
      <Table loading={loading}>
        <THead>
          <Tr>
            <Th>Admin ID</Th>
            <Th>Name</Th>
            <Th>Is Staff</Th>
            <Th className='table-action-cell'>
              Action
              <div>
                <button onClick={addOneRow}>Add</button>
              </div>
            </Th>
          </Tr>
        </THead>
        <TBody>
          {tableData.map((item, i) => <Tr className={classNames(item.actionStatus && `table-${item.actionStatus}-row`)} key={item.id}>
            <Td>{item.actionStatus === 'add' ? <input onChange={e => changeAdmin(e, 'adminId', i)} /> : item.adminId}</Td>
            <Td editable text={item.adminName} onChange={e => changeAdmin(e, 'adminName', i)} />
            <Td>
              {item.isStaff ? 'Y' : 'N'}
            </Td>
            <Td actionCell>
              <button onClick={() => saveOrUpdateOne(item)}>Save</button>
              <button onClick={() => changePassowrd(item)}>Change password</button>
              <button onClick={() => deleteAdmin(item, i)}>Delete</button>
            </Td>
          </Tr>)}
        </TBody>
      </Table>
    </main>
  )
}

export default Admin