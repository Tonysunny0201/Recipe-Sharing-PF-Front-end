import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Recipes from './pages/Recipes'
// import RecipeView from './pages/RecipeView'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/recipes' element={<Recipes/>}/>
        {/* <Route path='/:id/view' element={<RecipeView/>}/> */}
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={'true'}/>}/>
      </Routes> 
      <Footer/>
    </>
  )
}

export default App
