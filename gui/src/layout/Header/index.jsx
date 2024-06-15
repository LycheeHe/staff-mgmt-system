import { NavLink } from 'react-router-dom'
import './index.scss'
import { useCallback } from 'react'

const Header = () => {
  const getClassName = useCallback(({ isActive }) => isActive ? "active-menu-link" : "", [])
  return (
    <header>
      <ul className='menu-list'>
        <li className='menu-item'>
          <NavLink to="/staff" className={getClassName}>Staff</NavLink>
        </li>
        <li className='menu-item'>
          <NavLink to="/admin" className={getClassName}>Admin</NavLink>
        </li>
      </ul>
    </header>
  )
}
export default Header