import classNames from 'classnames'
import { memo } from 'react'

const list = [
  { key: 'yes-333333', value: 'Y' },
  { key: 'no-333333', value: 'N' }
]

const YesOrNo = ({ onAction, value }) => {
  return (
    <div className="yes-or-no">
      {list.map(item => <button className={classNames(value === item.value && 'active-button')} key={item.key} onClick={() => onAction(item.value)}>{item.value}</button>)}
    </div>
  )
}

export default memo(YesOrNo)