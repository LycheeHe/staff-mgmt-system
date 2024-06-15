import { cloneElement, useMemo, Children, memo } from 'react'
import './index.scss'

const Accordion = ({ children, activeTabKey }) => {
  const child = useMemo(() => {
    return Children.map(children, (item, index) => {
      const childProps = {
        ...item.props,
        activeTabKey
      }
      return cloneElement(item, childProps)
    })
  }, [children])
  return (
    <div className="accordion">
      <div className="accordion-tabs flex">
        {child}
      </div>
    </div>
  )
}

export default memo(Accordion)