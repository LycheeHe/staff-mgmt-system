import { memo, useEffect, useMemo, useRef, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
const Tooltip = ({ text, children, direction = 'top', isDeleteAction }) => {
  const ref = useRef()
  const [tooltipStyle, setStyle] = useState()

  const finalText = useMemo(() => isDeleteAction ? 'Are you sure to delete it?' : text, [text, isDeleteAction])

  const setPosition = ({ target: { offsetLeft } }) => {
    if (offsetLeft === 0) return
    if (direction !== 'top') return
    const { offsetWidth } = ref.current?.querySelector('.tooltip')
    const left = `${offsetLeft - offsetWidth / 2}px`
    setStyle({ left })
  }

  useEffect(() => {
    if (!ref.current) return

    const { offsetWidth } = ref.current?.querySelector('.tooltip')
    const { offsetTop, offsetLeft, offsetHeight } = ref.current?.querySelector('.tooltip-element').children?.[0]
    if (direction === 'left' && finalText) {
      const left = `${offsetLeft - offsetWidth - 10}px`
      const top = `${offsetTop - offsetHeight / 2}px`
      setStyle({ left, top })
      return
    }
  }, [finalText, direction, children])
  return (
    <div className="tooltip-container" ref={ref} onMouseOver={setPosition}>
      <div className={classNames('tooltip', `${direction}-tooltip`)} style={tooltipStyle}>{finalText}</div>
      <div className="tooltip-element">{children}</div>
    </div>
  )
}

export default memo(Tooltip)