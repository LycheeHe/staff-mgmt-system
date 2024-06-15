import React, { createContext, useContext, useMemo, useReducer } from "react"

const initialState = {
  activeTabKey: '1',
  staffData: [],
  positionData: [],
  alertText: '',
  alertType: '',
  loading: false,
  deptData: [],
  deptDropdownList: [],
  positionDropdownList: []
}
const StaffContext = createContext([initialState, () => null])

export const ActionType = {
  STAFF: 'STAFF',
}
export const StaffReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionType.STAFF: {
      return {
        ...state,
        ...payload,
        // alertType: payload.alertType ?? 'error'
      }
    }
  }
}

export default function StaffProvider({ children }) {
  const [state, dispatch] = useReducer(StaffReducer, initialState)
  const [staffState, staffDispatch] = useMemo(() => {
    return [state, dispatch]
  }, [state])

  return (
    <StaffContext.Provider value={[staffState, staffDispatch]}>
      {children}
    </StaffContext.Provider>
  )
}

export function useStaffContext() {
  return useContext(StaffContext)
}
