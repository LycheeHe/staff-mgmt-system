import './index.scss'
import classNames from 'classnames'
import Loading from '../Loading'
import { useEffect, useRef, useState } from 'react'

export const Th = ({ children, actionCell, className }) => {
  return (
    <th className={classNames('table-head-cell', className, actionCell && 'table-action-cell')}>
      {children}
    </th>
  )
}
export const Td = ({ className, rowSpan, colSpan, children, editable, text, onChange, actionCell }) => {
  return (
    <td
      className={classNames('table-cell', className, editable && 'editable-table-cell', actionCell && 'action-table-cell')}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      {text !== undefined ? editable ? <input value={text} onChange={onChange} /> : text : children}
    </td>
  )
}

export const Tr = ({ children, className }) => {
  return (
    <tr className={classNames('table-row', className)}>
      {children}
    </tr>
  )
}
export const THead = ({ children, className }) => {
  return (
    <thead className={classNames('table-head', className)}>
      {children}
    </thead>
  )
}

export const TBody = ({ children, className }) => {
  return (
    <tbody className={classNames('table-body', className)}>
      {children}
    </tbody>
  )
}

const Table = ({ children, className, loading }) => {
  const tableRef = useRef()
  const [tableStyle, setTableStyle] = useState()
  useEffect(() => {
    const { top } = tableRef.current.getBoundingClientRect()
    const height = (window.innerHeight - top) + 'px'
    setTableStyle({ height })
  }, [loading])
  return (
    <div className='table-container' ref={tableRef} style={tableStyle}>
      <Loading visible={loading} />
      <table className={classNames('table', className)}>
        {children}
      </table>
    </div>

  )
}

export default Table