import React from "react";
import { NavLink } from "react-router-dom";

function Card(props) {
  return (
    <>
   
          <div className="col-md-6 col-lg-4 col-10 max-auto">
          <div className="card " >
  <img src={props.imgSrc} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title font-weight-bold">{props.title}</h5>
    <p class="card-text">{props.text}</p>
    <NavLink to="/contact" class="btn btn-light">Go somewhere</NavLink>
  </div>
</div>

          </div>

    </>
  );
}

export default Card;
