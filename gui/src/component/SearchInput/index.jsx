import { memo, useEffect, useRef, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
const SearchList = () => {
  return (
    <ul className="dropdown-list" style={dropdownStyle}>
      {list.map(item => <li className={classNames('dropdown-item', selectedItemId === item.id && 'selected-dropdown-item')} key={item.id} onClick={() => clickItem(item)}>
        <span className='text'>{item.text}</span>
        {item.subText && <div className='sub-text'>{item.subText}</div>}
      </li>)}
    </ul>
  )
}
const SearchInput = ({ list, selectedItemId, onSelect, onChange, defaultValue, onFocus }) => {
  const inputRef = useRef()
  const [dropdownStyle, setDropdownStyle] = useState({ top: '', left: '' })
  const [value, setValue] = useState(defaultValue)
  const [visible, setVisible] = useState(false)

  const changeValue = (e) => {

    setValue(e.target.value)
    onChange(e)
    setVisible(true)
  }
  const focusValue = (e) => {
    setVisible(true)
    onFocus(e)
  }
  const clickItem = (item) => {
    setValue(item.value)
    onSelect(item)
  }

  useEffect(() => {
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = inputRef.current
    const dropdownStyle = { top: `${offsetTop + offsetHeight + 5}px`, left: `${offsetLeft}px`, width: `${offsetWidth}px` }
    setDropdownStyle(dropdownStyle)
  }, [inputRef])
  return (
    <div className="search-input">
      <input type='text' value={value} ref={inputRef} onChange={changeValue} onFocus={focusValue} onBlur={() => setVisible(false)} />
      {visible && <ul className="dropdown-list" style={dropdownStyle}>
        {list.map(item => <li className={classNames('dropdown-item', selectedItemId === item.id && 'selected-dropdown-item')} key={item.id} onClick={() => clickItem(item)}>
          <span className='text'>{item.text}</span>
          {item.subText && <div className='sub-text'>{item.subText}</div>}
        </li>)}
      </ul>}
    </div>
  )
}

export default memo(SearchInput)