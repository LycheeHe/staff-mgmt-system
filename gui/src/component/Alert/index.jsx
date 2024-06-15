import { memo, useEffect, useState } from 'react'
import './index.scss'
import classNames from 'classnames'

const Alert = ({ text, ms = 3000, type }) => {
  const [visible, setVisible] = useState(text !== '')
  useEffect(() => {
    setVisible(text !== '')
    setTimeout(() => {
      setVisible(false)
    }, ms)
  }, [text])
  return (
    <>
      {visible && <div className={classNames('alert', type !== '' && `${type}-alert`)}>{text}</div>}
    </>
  )
}

export default memo(Alert)