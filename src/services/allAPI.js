import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// register called by auth component when user click register btn
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// loginAPI called by Auth when user click on login button
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addRecipeAPI called by Add component when user click add btn
export const addRecipeAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-recipe`,reqBody,reqHeader)
} 

// allRecipeAPI called by recipe component  when page loaded in brower (useEffect)
export const allRecipeAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-recipes?search=${searchKey}`,{},reqHeader)
} 

// userRecipeAPI called by view component 
export const userRecipeAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-recipes`,{},reqHeader)
}


// updateRecipeAPI called by Edit component when user click update btn ( recipes/67496122a602da20687f05bf/edit )
export const updateRecipeAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/recipes/${id}/edit`,reqBody,reqHeader)
}

// userRecipeRemoveAPI called by view component when user click delete btn 
export const userRecipeRemoveAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/recipes/${id}/remove`,{},reqHeader)
}

// updateUserAPI called by profile component when user click update btn edit-user
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}

// Add recipe to favorites (Bookmark)
export const addToFavoritesAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/add-bookmark`,reqBody,reqHeader)
}

// Get favorites API
export const getFavoritesAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-bookmarks`, {},reqHeader);  // Adjust the endpoint according to your backend
  }

// Remove recipe from favorites (Bookmark)
export const removeFromFavoritesAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/bookmark/${id}/remove`, {}, reqHeader)
}