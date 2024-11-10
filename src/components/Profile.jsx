import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';


const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-evenly">
          <h3 className='text-warning'>Profile</h3>
          <button onClick={()=>setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
        </div>
        <Collapse in={open}>
          <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
            <label className='text-center'>
              <input  type="file" style={{display:'none'}} name="" id="" />
                <img width={'200px'} height={'200px'} className='rounded-circle' src="https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png" alt="" />
            </label>
            <div className='mt-2 w-100'>
              <input type="text" className='form-control' placeholder='UserName' name="" id="" />
            </div>
            <div className='mt-2 w-100'>
              <input type="text"  className='form-control' placeholder='Email' name="" id="" />
            </div>
            <div className='d-grid w-100 mt-2'>
              <button className='btn btn-warning'>Update Profile</button>
            </div>
          </div>
        </Collapse>
    </>
  );
};

export default Profile;