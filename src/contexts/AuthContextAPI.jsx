// rafce
import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()

const AuthContextAPI = ({ children }) => {

    const [isAuthoried, setIsAuthoried] = useState(
        !!sessionStorage.getItem('token')
    )

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        setIsAuthoried(!!token)
    }, [])

    return (
        <tokenAuthContext.Provider value={{ isAuthoried, setIsAuthoried }}>
            {children}
        </tokenAuthContext.Provider>
    )
}

export default AuthContextAPI