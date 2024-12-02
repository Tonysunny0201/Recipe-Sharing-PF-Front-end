import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image1 from '../assets/image1.png'

const Home = () => {

  // const [allHomeProjects,setAllHomeProjects] = useState([])
  const navigate = useNavigate()

  const handleRecipes = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/recipes')
    }else{
      alert("Please login to get full access to our website!!")
    }
  }

  return (
    <>
      {/* <Header/> */}
      <div>
        <h1 className='text-center mt-5'>Make mealtime a breeze</h1>
        <div style={{minHeight:"70vh"}} className='d-flex justify-content-center align-items-center w-100'>
        <div className='mt-4'>
              <img className='me-3 rounded' width={'330px'} src="https://images.pexels.com/photos/8119911/pexels-photo-8119911.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <img className='rounded' width={'350px'} src="https://images.pexels.com/photos/12673728/pexels-photo-12673728.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <img className='ms-3 rounded' width={'330px'} src="https://images.pexels.com/photos/13426419/pexels-photo-13426419.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /> 
          </div>
        </div>
        <div className='text-center mt-4'>
          {
            sessionStorage.getItem("token") ?
            <Link className='btn btn-warning' to={'/dashboard'}>Dashboard</Link>
            :
            <Link className='btn btn-warning' to={'/login'}>Started with Us</Link>
          }
        </div>
      </div>

      <div className='mt-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img src={Image1} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 style={{fontSize:'60px'}}>Sharing made simple</h1>
              <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam laborum mollitia esse? In veniam officia repudiandae natus, dolorem labore deserunt praesentium alias libero ipsa aut dignissimos nulla perspiciatis dicta non!</p>
            </div>
          </div>
        </div>
      </div>
        
      <div style={{height:'300px'}} className='text-center mt-5 p-5 bg-info'>
          <h1 style={{fontSize:'60px'}} className='mt-4'>Ready to get started?</h1>
          <div className='mt-3'><button onClick={handleRecipes} className='btn btn-warning'>ALL Recipes</button></div>
          {/* <div className='mt-3'><Link className='btn btn-warning' to={'/login'}>Login</Link></div> */}
      </div>
      
    </>
  )
}

export default Home