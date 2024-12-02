import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import Header from '../components/Header'
import SERVER_URL from '../services/serverUrl'
import { getFavoritesAPI, removeFromFavoritesAPI } from '../services/allAPI'


const Favorites = () => {

  const [favorites, setFavorites] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      try {
        const response = await getFavoritesAPI(reqHeader)
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error)
      }
    }
  };

  const handleRemoveFavorite = async (id) => {
    console.log(id);
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        await removeFromFavoritesAPI(id, reqHeader)

      } catch (err) {
        console.log(err);
      }
    }
    fetchFavorites();
  }

  return (
    <>
      <Header />
      <Container style={{ paddingTop: '100px' }} className="px-4">
        <>
          <h1 className="text-center text-info fw-bold display-5">My Favorites</h1>
          <Row className="mt-5 g-4">
            {favorites && favorites.length > 0 ? (
              favorites.map((favorite) => (
                <Col sm={6} md={4} lg={3} key={favorite._id}>
                  <Card onClick={handleShow} className="shadow">
                    <Card.Img
                      variant="top"
                      src={`${SERVER_URL}/uploads/${favorite.recipeId.recipeImg}`}
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt={favorite.recipeId.title}
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold fs-5">{favorite.recipeId.title}</Card.Title>
                      <Card.Text className="text-muted">{favorite.recipeId.description}</Card.Text>
                      <div className="d-flex justify-content-evenly mt-3">
                        <Button
                          variant="link"
                          className="text-danger fs-4"
                          onClick={() => handleRemoveFavorite(favorite._id)}
                        >
                          <i className="fa-solid fa-heart-circle-xmark"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Modal size='lg' show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Recipe Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className='row align-items-center'>
                      <div className='col-lg-6'>
                        <img className='img-fluid' src={`${SERVER_URL}/uploads/${favorite.recipeId.recipeImg}`} alt="" />
                      </div>
                      <div className='col-lg-6'>
                        <h3>{favorite.recipeId.title}</h3>
                        <h6 className='fw-bolder'>Recipe used : <span className='text-danger'>{favorite.recipeId.ingredients}</span></h6>
                        <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description : </span>{favorite.recipeId.description}</p>
                        <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Instructions : </span>{favorite.recipeId.instructions}</p>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                </Col>
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <img
                  className="w-100"
                  src="https://cdn.dribbble.com/users/860366/screenshots/6364054/desolazione_empty_1.gif"
                  alt="EmptyWishlist"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
                <h1 className="text-primary fw-bold display-6 mt-4">Your <span className='text-info'>Favorites</span> is Empty!!</h1>
              </div>
            )}
          </Row>
        </>
      </Container>
    </>
  )
}

export default Favorites;
