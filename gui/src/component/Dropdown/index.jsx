import { useMemo, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import './index.scss'

const Dropdown = ({ selectedId, list, onSelect }) => {
  const inputRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({ top: '', left: '' })
  const clickItem = (item) => {
    setVisible(false)
    onSelect(item)
  }
  const text = useMemo(() => list.find(item => item.id === selectedId)?.text || '', [selectedId, list])

  console.log(list, selectedId)
  useEffect(() => {
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = inputRef.current
    const dropdownStyle = { top: `${offsetTop + offsetHeight + 5}px`, left: `${offsetLeft}px`, width: `${offsetWidth}px` }
    setDropdownStyle(dropdownStyle)
  }, [inputRef])
  return (
    <div className="dropdown">
      <div className='dropdown-value' ref={inputRef} onClick={() => setVisible(!visible)}>{text}</div>
      {visible && <ul className="dropdown-list" style={dropdownStyle}>
        {list.map(item => <li className={classNames('dropdown-item', selectedId === item.id && 'selected-dropdown-item')} key={item.id} onClick={() => clickItem(item)}>
          <span className='text'>{item.text}</span>
          {item.subText && <span className='sub-text'>{item.subText}</span>}
        </li>)}
      </ul>}
    </div>
  )
}

export default Dropdown