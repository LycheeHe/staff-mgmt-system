import React, { createContext, useContext, useMemo, useReducer } from "react"

const initialState = {
  tableData: [],
  alertText: '',
  alertType: '',
  loading: false
}
const AdminContext = createContext([initialState, () => null])

export const ActionType = {
  ADMIN: 'ADMIN',
}
export const AdminReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionType.ADMIN: {
      return {
        ...state,
        ...payload,
        alertType: payload.alertType ?? 'error'
      }
    }
  }
}

export default function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(AdminReducer, initialState)
  const [adminState, adminDispatch] = useMemo(() => {
    return [state, dispatch]
  }, [state])

  return (
    <AdminContext.Provider value={[adminState, adminDispatch]}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminContext() {
  return useContext(AdminContext)
}
