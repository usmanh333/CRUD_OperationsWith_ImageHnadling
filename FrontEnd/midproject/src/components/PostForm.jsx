import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

const PostForm = () => {
    let navigate = useNavigate()
    const [getData, setGetData] = useState({});
    
    // Image Section

    const [getImage,setGetImage] = useState(null);
    const handleImage = async (e) => {
      setGetImage(e.target.files[0]);
    };
    
    // Image Section ends here

    const inputHandler=(e)=>{
        setGetData({...getData,  [e.target.name]: e.target.value})
        console.log(getData)
    }

    const SubmitHandler = async (e) => {
      e.preventDefault();
      try {
        // upload image and post the data to the server
        const formData = new FormData();
        formData.append("upload", getImage);
        formData.append("title", getData.title);
        formData.append("desc", getData.desc);
    
        const response = await Axios.post("http://localhost:4000/cards", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        console.log(response.data.name);
        navigate("/cards");
      } catch (error) {
        console.error(error);
      }
    };
    
    
// ---------------------------------------

  return (
    <div className="container">
      <form class="container w-50 mt-4" action="/cards" onSubmit={SubmitHandler} enctype="multipart/form-data" method="POST">
        <div class="form-check mt-4">
          <label for="validationDefault01 mt-2" class="form-label">
            Post title
          </label>
          <input
            type="text"
            onChange={inputHandler}
            class="form-control"
            id="validationDefault01"
            name="title"
            placeholder="Enter title"
            required
          />
        </div>
        <div class="mb-3 form-check mt-4">
          <label for="validationTextarea" class="form-label">
            Post Description
          </label>
          <textarea
            onChange={inputHandler}
            class="form-control"
            id="validationTextarea"
            placeholder="Enter description"
            name="desc"
            required
          ></textarea>
          <div class="invalid-feedback">
            Please enter a Description in the textarea.
          </div>
       
        </div>

            {/* Image Sections */}

        <div class="mb-3 form-check mt-5">
          <input
            onChange={handleImage}
            type="file"
            name="imageName"
            class="form-control"
            aria-label="file example"
            required
          />
          <div class="invalid-feedback">Example invalid form file feedback</div>
        </div>
        {/* Image Section End */}

        <div class=" ">
          <button class="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
