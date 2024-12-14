import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Recipes from './pages/Recipes'
import Favorites from './pages/Favorites'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import AdminDash from './pages/adminDash'

function App() {

  const {isAuthoried,setIsAuthoried} = useContext(tokenAuthContext)
 
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={isAuthoried ? <Dashboard/> : <Navigate to={'/login'}/> }/>
        <Route path='/recipes' element={isAuthoried ? <Recipes/> : <Navigate to={'/login'}/> }/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={'true'}/>}/>
        <Route path='/favorites' element={isAuthoried ? <Favorites/>: <Navigate to={'/login'} /> }/>
        <Route path='/admin' element={isAuthoried ? <AdminDash/> : <Navigate to={'/login'}/> }/>
      </Routes> 
      <Footer/>
    </>
  )
}

export default App
