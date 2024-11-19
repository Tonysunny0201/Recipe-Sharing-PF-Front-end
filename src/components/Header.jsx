import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({insideDashboard}) => {
  return (
    <Navbar style={{zIndex:1}} className="border bg-info shadow position-fixed w-100">
      <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'black'}} className=' fw-bolder'>
            <i className='fa-solid fa-mug-saucer'></i> Foodza
            </Navbar.Brand>
          </Link>
          {
            insideDashboard && 
            <div className="ms-auto">
              <button className='btn btn-link fw-bolder'>Logout <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
            </div>
          }
        </Container>
    </Navbar>
  )
}

export default Header