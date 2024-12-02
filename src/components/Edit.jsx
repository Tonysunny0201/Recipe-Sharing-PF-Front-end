import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UploadImage2 from '../assets/uploadimage2.png'
import SERVER_URL from '../services/serverUrl';
import { updateRecipeAPI } from '../services/allAPI';
import { editRecipeResponseContext } from '../contexts/ContextApi';


const Edit = ({recipe}) => {

  const {editRecipeResponse,setEditRecipeResponse} = useContext(editRecipeResponseContext)
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);

  const [recipeDetails,setRecipeDetails] = useState({
    id: recipe._id ,title:recipe.title, description:recipe.description, ingredients:recipe.ingredients, instructions:recipe.instructions, recipeImg:""
  })
  console.log(recipeDetails);

  useEffect(()=>{
    if(recipeDetails.recipeImg.type=="image/png" || recipeDetails.recipeImg.type=="image/jpg" || recipeDetails.recipeImg.type=="image/jpeg"){
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(recipeDetails.recipeImg))
    }else{
      // invalid image
      setImageFileStatus(false)
      setPreview("")
      setRecipeDetails({...recipeDetails,recipeImg:""})
    }
  },[recipeDetails.recipeImg])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setRecipeDetails({
      id: recipe._id ,title:recipe.title, description:recipe.description, ingredients:recipe.ingredients, instructions:recipe.instructions, recipeImg:""
    })
  }
  const handleShow = () => {
    setShow(true);
    setRecipeDetails({
      id: recipe._id ,title:recipe.title, description:recipe.description, ingredients:recipe.ingredients, instructions:recipe.instructions, recipeImg:""
    })
  }

  const handleUpdateRecipe = async()=>{
    const {id,title,description,ingredients,instructions,recipeImg} = recipeDetails
    if(title && description && ingredients && instructions){
      // make api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("description",description)
      reqBody.append("ingredients",ingredients)
      reqBody.append("instructions",instructions)
      preview? reqBody.append("recipeImg",recipeImg) : reqBody.append("recipeImg",recipe.recipeImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try {
          const result = await updateRecipeAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("recipe added successfully...")
            setEditRecipeResponse(result)
            handleClose()
          }
        } catch (err) {
          console.log(err);
        }
      }
    }else{
      alert("fill the form completely...")
    }
  }

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
                <input type="file" style={{ display: 'none' }} onChange={e=>setRecipeDetails({...recipeDetails,recipeImg:e.target.files[0]})} />
                <img
                  src={preview?preview:`${SERVER_URL}/uploads/${recipe.recipeImg}`}
                  className="img-fluid"
                  alt="Upload"
                />
              </label>
              { !imageFileStatus && 
                <div className="text-warning fw-bolder my-2">
                *Upload only the following file types (jpeg, jpg, png)!
              </div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Recipe Title"
                  className="form-control"
                  value={recipeDetails.title}
                  onChange={e => setRecipeDetails({...recipeDetails,title:e.target.value})}
                />
              </div>
              <div className="mb-2">
                <textarea
                  placeholder="Recipe Description"
                  className="form-control"
                  value={recipeDetails.description}
                  onChange={e => setRecipeDetails({...recipeDetails,description:e.target.value})}
                ></textarea>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Ingredients (comma-separated)"
                  className="form-control"
                  value={recipeDetails.ingredients}
                  onChange={e => setRecipeDetails({...recipeDetails,ingredients:e.target.value})}
                />
              </div>
              <div className="mb-2">
                <textarea
                  placeholder="Instructions"
                  className="form-control"
                  value={recipeDetails.instructions}
                  onChange={e => setRecipeDetails({...recipeDetails,instructions:e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateRecipe}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
