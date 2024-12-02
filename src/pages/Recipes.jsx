import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import RecipeCart from '../components/RecipeCart'
import { Col, Row } from 'react-bootstrap'
import { allRecipeAPI } from '../services/allAPI'

const Recipes = () => {

  const [searchKey,setSearchKey] = useState("")
  const [allRecipes,setAllRecipes] = useState([])
  console.log(allRecipes);

  useEffect(()=>{
    getAllRecipes()
  },[searchKey])

  const getAllRecipes = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await allRecipeAPI(searchKey,reqHeader)
        if(result.status==200){
           setAllRecipes(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Recipes</h1>
          <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Food' className='form-control w-25' type="text" name="" id="" />
        </div>
        <Row className='mt-3'>
          {
            allRecipes?.length>0 ?
              allRecipes?.map(recipe=>(
                <Col key={recipe?._id} className='mb-3' sm={12} md={6} lg={4}>
                  <RecipeCart displayData={recipe}/>
                </Col>
              ))
            :
            <div className='text-danger fw-bolder'>Recipe Not Found!!</div>
          }
        </Row>
      </div>
    </>

  )
}

export default Recipes