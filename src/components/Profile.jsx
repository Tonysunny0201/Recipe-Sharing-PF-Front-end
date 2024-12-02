import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { updateUserAPI } from '../services/allAPI';
import { editProfileResponseContext } from '../contexts/ContextApi';
import ProfileImg from '../assets/ProfileImg.png'

const Profile = () => {

  const {editProfileResponse,setEditProfileResponse} = useContext(editProfileResponseContext)
   
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:""
  })

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password
      })
    }
  },[open])

  const UpdateUserProfile = async()=>{
    const {username,email,password} = userDetails
    if (username && email) {
      const reqBody = {
        username,
        email,
        password
      }
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateUserAPI(JSON.stringify(reqBody), reqHeader);
          if (result.status === 200) {
            alert("User profile updated successfully...");
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setEditProfileResponse(result)
            setOpen(!open)
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill the form completely...");
    }    
  }

  return (
    <>
      <div className="d-flex justify-content-evenly">
          <h3 className='text-warning'>Profile</h3>
          <button onClick={()=>setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
        </div>
        <Collapse in={open}>
          <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
            <label className='text-center'>
                <img width={'200px'} height={'200px'} className='rounded-circle' src={ProfileImg} alt="" />
            </label>
            <div className='mt-2 w-100'>
              <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" className='form-control' placeholder='UserName' name="" id="" />
            </div>
            <div className='mt-2 w-100'>
              <input value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} type="text"  className='form-control' placeholder='Email' name="" id="" />
            </div>
            <div className='d-grid w-100 mt-2'>
              <button onClick={UpdateUserProfile} className='btn btn-warning'>Update Profile</button>
            </div>
          </div>
        </Collapse>
    </>
  );
};

export default Profile;