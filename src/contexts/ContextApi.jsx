// rafce
import React, { createContext, useState } from 'react'
export const addRecipeResponseContext = createContext()
export const editRecipeResponseContext = createContext()
export const editProfileResponseContext = createContext()

const ContextApi = ({children}) => {
    const [addRecipeResponse,setAddRecipeResponse] = useState("")
    const [editRecipeResponse,setEditRecipeResponse] = useState("")
    const [editProfileResponse,setEditProfileResponse] = useState("")
  return (
    <editProfileResponseContext.Provider value={{editProfileResponse,setEditProfileResponse}}>
      <editRecipeResponseContext.Provider value={{editRecipeResponse,setEditRecipeResponse}}>
        <addRecipeResponseContext.Provider value={{addRecipeResponse,setAddRecipeResponse}}>
            {children}
        </addRecipeResponseContext.Provider>
      </editRecipeResponseContext.Provider>
    </editProfileResponseContext.Provider>
  )
}

export default ContextApi