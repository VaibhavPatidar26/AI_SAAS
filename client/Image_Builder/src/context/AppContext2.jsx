import React, { createContext } from 'react'

export const AppContext2 = createContext()

function AppProvider2({children}){
return(
    <AppContext2.Provider value={{/* global states to be passed*/ }}>{children}</AppContext2.Provider>
)
}

export default AppProvider2