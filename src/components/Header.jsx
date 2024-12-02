import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContextAPI'

const Header = ({insideDashboard}) => {

  const {isAuthoried,setIsAuthoried} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthoried(false)
    navigate("/")
  }
  return (
    <Navbar style={{zIndex:1}} className="border bg-info shadow position-fixed w-100">
      <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'black'}} className='fw-bolder'>
            <i className='fa-solid fa-mug-saucer'></i> Foodza
            </Navbar.Brand>
          </Link>
          <Link to={'/favorites'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'black'}} className='fw-bolder'>
            <i className="fa-solid fa-bookmark"></i> Favorites
            </Navbar.Brand>
          </Link>
          {
            insideDashboard && 
            <div className="ms-auto">
              <button onClick={logout} className='btn btn-link fw-bolder'>Logout <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
            </div>
          }
        </Container>
    </Navbar>
  )
}

export default Header