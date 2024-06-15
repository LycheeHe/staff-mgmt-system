import { memo, useEffect, useMemo } from 'react'
import classNames from 'classnames'

const AccordionTab = ({ tabKey, tabName, children, activeTabKey, onClick }) => {
  const active = useMemo(() => activeTabKey === tabKey, [tabKey, activeTabKey])
  return (
    <div className="accordion-tab flex-item" key={tabKey}>
      <div className={classNames('accordion-tab-head', active && 'active-accordion-tab-head')} onClick={() => onClick(tabKey)}>{tabName}</div>
      {active && <div className="accordion-tab-content">{children}</div>}
    </div>
  )
}

export default memo(AccordionTab)