import ClassNames from 'classnames'
import './index.scss'
import { memo, useCallback } from 'react'

const ListGroup = ({ value, list, onClick }) => {
  return (
    <div className="list-group">
      {list.map(item => <button
        className={ClassNames('button', value === item.value && 'active-button')}
        key={item.id}
        onClick={() => onClick(item)}
      >{item.value}</button>)}
    </div>
  )
}

export default memo(ListGroup)