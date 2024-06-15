import StaffTab from './StaffTab'
import PositionTab from './PositionTab'
import { Accordion, AccordionTab, Alert, Tip } from '../../component'
import { useStaffContext } from './useStaffContext'
import useStaffEvent from './useStaffEvent'
import { useEffect } from 'react'
import DeptTab from './DeptTab'
const Staff = () => {
  const [state] = useStaffContext()
  const { alertText, alertType, activeTabKey } = state

  const { changeTabKey } = useStaffEvent()
  useEffect(() => console.log('while init'), [])
  return (
    <main className='staff-main'>
      <Alert text={alertText} type={alertType} />
      <Tip />
      <Accordion activeTabKey={activeTabKey}>
        <AccordionTab tabKey="1" tabName="Staff" onClick={changeTabKey}>
          <StaffTab />
        </AccordionTab>
        <AccordionTab tabKey="2" tabName="Position" onClick={changeTabKey}>
          <PositionTab />
        </AccordionTab>
        <AccordionTab tabKey="3" tabName="Department" onClick={changeTabKey}>
          <DeptTab />
        </AccordionTab>
      </Accordion>
    </main>
  )
}

export default Staff