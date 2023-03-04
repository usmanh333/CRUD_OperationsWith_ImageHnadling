import React, { useEffect, useState, } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Cards = () => {
  let nevigate = useNavigate()
  let params = useParams()
  const [showData, setShowData] = useState([]);

  const showCards = async () => {
    let apiData = await fetch("http://localhost:4000/cardsdata");
    let res = await apiData.json();
    setShowData(res);
    console.log(res);
  };

  useEffect(() => {
    showCards();
  }, []);

  const deletePost = async(id)=>{
    console.log(id)
    let removeRes = await fetch('http://localhost:4000/cardsdata/'+ id, {
      method: 'delete' // Always define method 
    })
    removeRes = await removeRes.json()
    if(removeRes){
      showCards()
    }
  }


  const ClickBack = ()=>{
    nevigate('/postcards')
  }

  return (
    <>
      <h1 className="p-4">Welcome to E-Commerce Site</h1>
      <p className="btn btn-success" onClick={ClickBack}><Link className="text-white text-decoration-none">Create A Post Now</Link></p>
      <div className="d-flex flex-wrap">
        {showData.map((val) => {
          return (
            <>
              <div className="d-flex m-4">
                <div class="card" style={{ width: "18rem" }}>
                  <img src={`http://localhost:4000/cardsdata/uploads/${val.image}`} class="card-img-top" alt="Image" />
                  <div class="card-body" style={{height: "auto"}}>
                    <h5 class="card-title">Card title : {val.title} </h5>
                    <p class="card-text">
                      <span>
                        {val.desc}<br />
                      </span>
                    </p>
                    <button href="#" class="btn btn-primary">
                      See More Details
                    </button>
                    
                  </div>
                  <button class="btn btn-danger m-2" onClick={()=>{deletePost(val._id)}}> {/* here the ID will match with the BE ID */}
                      Remove
                    </button>
                  <Link to={`/cardsdata/${val._id}`} class="btn btn-danger m-2" > {/* here the ID will match with the BE ID */}
                      Update Card
                    </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Cards;
