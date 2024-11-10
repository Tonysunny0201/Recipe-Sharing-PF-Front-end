import React from 'react'
import Header from '../components/Header'
import RecipeCart from '../components/RecipeCart'
import { Col, Row } from 'react-bootstrap'

const Recipes = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Recipes</h1>
          <input onChange={e => setSearchKey(e.target.value)} placeholder='Search Food' className='form-control w-25' type="text" name="" id="" />
        </div>
        <Row className='mt-3'>
          <Col className='mb-3' sm={12} md={6} lg={4}>
            <RecipeCart />
          </Col>
          {/* <div className='text-danger fw-bolder'>Project Not Found!!</div> */}
        </Row>
      </div>
    </>

  )
}

export default Recipes