import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterSeats.css"

function EnterSeats({setNoOfSeats}) {

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault();
    setNoOfSeats(parseInt(e.target.seats.value))
    navigate('/')
  }

  return (
    <div className="enter-no-of-seat">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Welcome to Unstope Express</h1>
        <h2>Enter the number of seats you want to book</h2>
        <p>max seats allowed are 7</p>
        <input type="number" name="seats" min={1} max={7} step={1} />
        <button>NEXT</button>
      </form>
    </div>
  );
}

export default EnterSeats;
