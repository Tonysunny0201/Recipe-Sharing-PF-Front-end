import React, { useContext, useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { adminRecipesAPI, updateRecipeStatusAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const adminDash = () => {

    const {isAuthoried,setIsAuthoried} = useContext(tokenAuthContext)
    const navigate = useNavigate()
    const [allRecipes, setAllRecipes] = useState([])
    console.log(allRecipes);



    const logout = () => {
        sessionStorage.clear()
        setIsAuthoried(false)
        navigate("/")
    }

    useEffect(() => {
        getAllRecipes()
    }, [])

    const getAllRecipes = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await adminRecipesAPI(reqHeader)
                if (result.status == 200) {
                    setAllRecipes(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const updateRecipeStatus = async (id,status)=>{
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await updateRecipeStatusAPI(id,status,reqHeader)
                getAllRecipes()
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            {/* nav-bar */}
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Link to={"/"} style={{ textDecoration: 'none' }}>
                        <Navbar.Brand >
                            <i className="fa-solid fa-mug-saucer"></i> Foodza
                        </Navbar.Brand>
                    </Link>
                    <div className="ms-auto">
                        <button onClick={logout} className='btn btn-link fw-bolder'>Logout <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
                    </div>
                </Container>
            </Navbar>
            {/* table  */}
            <div className='container my-5'>
                <h1 className='text-info'>All User Recipes Requests</h1>
                <table className="table my-5 shadow border">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipe name</th>
                            <th>description</th>
                            <th>Action / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allRecipes?.length > 0 ?
                                allRecipes?.map((recipe,index) => (
                                    <tr key={recipe?._id}>
                                        <td>{index+1}</td>
                                        <td>{recipe?.title}</td>
                                        <td>{recipe?.description}</td>
                                        <td>
                                            <div className="d-flex">
                                                {recipe?.status == "Pending" ? (
                                                    <>
                                                        <button onClick={() => updateRecipeStatus(recipe._id, "Approved")} className="btn btn-success">
                                                            <i className="fa-solid fa-check"></i> Approved
                                                        </button>
                                                        <button onClick={() => updateRecipeStatus(recipe._id, "Rejected")} className="ms-2 btn btn-danger">
                                                            <i className="fa-solid fa-xmark"></i> Rejected
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span
                                                        className={`btn text-white des ${
                                                            recipe.status === "Approved"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                        }`}
                                                    >
                                                        {recipe.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <div className='text-danger fw-bolder'>Recipe Not Found!!</div>

                        }

                    </tbody>
                </table>
            </div>
        </>


    )
}

export default adminDash