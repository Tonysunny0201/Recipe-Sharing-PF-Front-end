import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../assets/upoloadimg.png'
import { addRecipeAPI } from '../services/allAPI';
import { addRecipeResponseContext } from '../contexts/ContextApi';

const Add = () => {

  const {addRecipeResponse,setAddRecipeResponse} = useContext(addRecipeResponseContext)
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);

  const [recipeDetails,setRecipeDetails] = useState({
    title:"", description:"", ingredients:"", instructions:"", recipeImg:""
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
    setPreview("")
    setImageFileStatus(false)
    setRecipeDetails({title:"", description:"", ingredients:"", instructions:"", recipeImg:""})
  }
  const handleShow = () => setShow(true);


  const handleAddRecipe = async ()=>{
    const { title, description, ingredients, instructions, recipeImg } = recipeDetails
    if(title && description && ingredients && instructions && recipeImg){
      // alert("proceed to api")
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("description",description)
      reqBody.append("ingredients",ingredients)
      reqBody.append("instructions",instructions)
      reqBody.append("recipeImg",recipeImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // Make API call
        try {
          const result = await addRecipeAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("Recipe added Successfully..")
            setAddRecipeResponse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);
        }
      }
    }else{
      alert("Please fill the form completely!!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn">+ New Recipe</button>
      <Modal size="lg" centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e=>setRecipeDetails({...recipeDetails,recipeImg:e.target.files[0]})} />
                <img
                  src={preview?preview:uploadImg}
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
          <Button variant="primary" onClick={handleAddRecipe}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
