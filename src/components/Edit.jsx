import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Edit = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = () => {
    // Add recipe submission logic here
    console.log({ title, description, ingredients, instructions, image });
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className="btn">Edit</button>
      <Modal size="lg" centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                <img
                  src="https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png"
                  className="img-fluid"
                  alt="Upload"
                />
              </label>
              <div className="text-warning fw-bolder my-2">
                *Upload only the following file types (jpeg, jpg, png)!
              </div>
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Recipe Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <textarea
                  placeholder="Recipe Description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Ingredients (comma-separated)"
                  className="form-control"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <textarea
                  placeholder="Instructions"
                  className="form-control"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
