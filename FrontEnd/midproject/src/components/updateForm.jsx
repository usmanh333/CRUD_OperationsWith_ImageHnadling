import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateForm = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [getImage,setGetImage] = useState(null);

  let { id } = useParams();
  let navigate = useNavigate();

  const getUserDetail = async () => {
    try {
      let res = await fetch(`http://localhost:4000/cardsdata/${id}`);
      console.log(res);
      let card = await res.json();
      console.log(card);
      setTitle(card.title);
      setDesc(card.desc);
      setGetImage(card.getImage)
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", getImage);

    const resUpdate = await fetch(`http://localhost:4000/cardsdata/${id}`, {
      method: "PUT",
      body: formData,
    });
    const updatedCard = await resUpdate.json();
    console.log(updatedCard);
    navigate("/cards");
  };

  // to handle images
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGetImage(file);
  };  

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div>
      <div className="container">
        <form className="container w-50 mt-4" onSubmit={updateHandler} encType="multipart/form-data" method="POST">
          <div className="form-check mt-4">
            <label htmlFor="title" className="form-label">
              Post title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-3 form-check mt-4">
            <label htmlFor="desc" className="form-label">
              Post Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control"
              id="desc"
              placeholder="Enter description"
              name="desc"
              required
            ></textarea>
            <div className="invalid-feedback">Please enter a Description in the textarea.</div>
          </div>

          <div class="mb-3 form-check mt-5">
            <input
              type="file"
              onChange={handleImageChange} 
              name="image"
              class="form-control"
              aria-label="file example"
              required
            />
            <div class="invalid-feedback">Example invalid form file feedback</div>
          </div>

          <div className="">
            <button className="btn btn-primary" type="submit">
              Update Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
