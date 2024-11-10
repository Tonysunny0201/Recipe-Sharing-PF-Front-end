import React from 'react'
import { Link } from 'react-router-dom'
import { Form, FloatingLabel, Spinner } from 'react-bootstrap'
import AuthImg from '../assets/Auth-image.png'

const Auth = ({insideRegister}) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='shadow card p-2'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid' src={AuthImg} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 className='mt-2'><i className='fa-solid fa-mug-saucer'></i> Foodz</h1>
              <h5> Sign {insideRegister ? "Up" : "In"} to your Account</h5>
              <Form>
                { 
                  insideRegister && 
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ? 
                  <div className='mt-3'>
                    <button  className='btn btn-primary mb-2'>Register</button>
                    <p>Existing User? Please Click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                    <button className='btn btn-primary mb-2 d-flex'>Login
                    {/* {isLogined &&  <Spinner className='ms-1' animation="border" variant="light" />}   */}
                    </button> 
                    
                    <p>New User? Please Click here to <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth