
import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { addToFavoritesAPI } from '../services/allAPI'
import SERVER_URL from '../services/serverUrl'

const RecipeCart = ({ displayData }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBookMark = async () => {
        const reqBody = { "recipeId": `${displayData._id}` }
        console.log(reqBody);
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                // console.log(displayData._id);
                await addToFavoritesAPI(reqBody, reqHeader);
                alert("Successfully added to favorites!");
                handleClose();
            } catch (err) {
                alert("Error adding to favorites.");
                console.log(err);
            }
        }
    }
    
    return (
        <>
            <Card onClick={handleShow} className='btn w-50 shadow'>
                <Card.Img variant="top" height={'200px'} className='images' src={`${SERVER_URL}/uploads/${displayData?.recipeImg}`} />
                <Card.Body>
                    <Card.Title>{displayData?.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recipe Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row align-items-center'>
                        <div className='col-lg-6'>
                            <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.recipeImg}`} alt="" />
                        </div>
                        <div className='col-lg-6'>
                            <h3>{displayData?.title}</h3>
                            <h6 className='fw-bolder'>Recipe used : <span className='text-danger'>{displayData?.ingredients}</span></h6>
                            <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description : </span>{displayData?.description}</p>
                            <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Instructions : </span>{displayData?.instructions}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleBookMark} className='text-white bg-primary mt-2 rounded p-2'>
                            {/* <i className="fa-regular fa-bookmark"></i>  */}
                            <i class="fa-solid fa-bookmark fa-beat"></i> Add to Favorites
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RecipeCart;
