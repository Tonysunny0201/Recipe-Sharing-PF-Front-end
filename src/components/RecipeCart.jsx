import React, { useState } from 'react'
import { Card,Modal } from 'react-bootstrap';

const RecipeCart = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Card onClick={handleShow} className='btn w-50 shadow'>
            <Card.Img variant="top" height={'200px'} className='img-fluid' src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" />
            <Card.Body>
            <Card.Title>Burger</Card.Title>
            </Card.Body>
        </Card>

        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid' src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="" />
            </div>
            <div className='col-lg-6'>
              <h3>Burger</h3>
              <h6 className='fw-bolder'>Recipe used : <span className='text-danger'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti ad excepturi magni quaerat. Repellat enim nulla cupiditate sit, blanditiis inventore incidunt at! Dolorem perspiciatis iusto accusamus aperiam alias dolore?</span></h6>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Overview : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod est, a ipsum at reprehenderit nemo quia corrupti necessitatibus, nesciunt soluta optio corporis deserunt ducimus ex sint vero dolore molestiae quae!</p>
            </div>
          </div>
          <div>
          <button onClick={()=>handleBookMark(recipe)} className='text-white bg-primary  mt-2 rounded p-2'><i className="fa-regular fa-bookmark"></i></button>
          </div>
          {/* <div className='mt-2 float-start'>
            <a href="" className='btn btn-secondary' target='_blank'><i className='fa-brands fa-github'></i></a>
            <a href="" className='btn btn-secondary ms-2' target='_blank'><i className='fa-solid fa-link'></i></a>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RecipeCart