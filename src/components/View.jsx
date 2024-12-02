import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userRecipeAPI,userRecipeRemoveAPI } from '../services/allAPI'
import { addRecipeResponseContext, editRecipeResponseContext } from '../contexts/ContextApi'

const View = () => {

    const {editRecipeResponse,setEditRecipeResponse} = useContext(editRecipeResponseContext)
    const {addRecipeResponse,setAddRecipeResponse} = useContext(addRecipeResponseContext)
    const [userRecipes, setUserRecipes] = useState([])

    useEffect(()=>{
        getUserRecipes()
    },[addRecipeResponse,editRecipeResponse])
    console.log(userRecipes);
    
    const getUserRecipes = async ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization":`Bearer ${token}`
            }
            try {
                const result = await userRecipeAPI(reqHeader)
                console.log(result);
                if(result.status==200){
                    setUserRecipes(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const deleteRecipe = async (id) =>{
        const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }
        try {
            await userRecipeRemoveAPI(id,reqHeader)
            getUserRecipes()
        } catch (err) {
            console.log(err);   
        }
      }
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <h2 className='text-warning'>All Recipes & Details</h2>
                <div> <Add /> </div>
            </div>
            <div className='mt-2 allProjects'>
                {
                    userRecipes?.length>0?
                        userRecipes?.map(recipe=>(
                            <div key={recipe?._id} className='border rounded p-2 d-flex justify-content-between mb-3'>
                                <h3>{recipe?.title}</h3>
                                <div className='d-flex align-items-center '>
                                    <div className='btn'> <Edit recipe={recipe} /> </div>
                                    <button onClick={()=>deleteRecipe(recipe?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
                                </div>
                            </div>
                        ))
                        :
                    <div className='text-warning fw-bolder'>Not uploaded any Recipes...</div>
                }
            </div>
        </>
    )
}

export default View