import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import EventSeatIcon from '@mui/icons-material/EventSeat';  
import axios from 'axios'
import '../styles/Home.css'

let loadOnce = true;

function Home({noOfSeats}) {
  const [reservedSeats, setResevredSeats] = useState([])
  const [allSeats, setAllSeats] = useState([])
  const [row,setRow] = useState(-1)
  const [noseats,setNoseats] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/enter-seats')
  }

  useEffect(()=>{
    if(!noOfSeats) return navigate('/enter-seats');
    async function fetchData(){
      const res = await axios.post('http://localhost:3500/api/reserve-seats',{seats:noOfSeats});
      const data = await res.data;
      // if( (typeof data.data)==='string') return setNoseats(true);
      setRow(data.data.row)
      setAllSeats([...data.data.seatsArray])
      setResevredSeats([...data.data.reservedSeats])
    }
    if(loadOnce){
      loadOnce=false;
      fetchData().then(()=>loadOnce=true)
    }
  },[])


  return (
    <div className="home">
      <div className="home-container">
        <div className="seat-selection-title">
          <h1>Unstop Express</h1>
          <h2>Thank You For Visiting Us.</h2>
          {row!==-1 && <p>Your {noOfSeats} seats are around {row}th row</p>}
        </div>
        <div className="seat-selection-tab">
          {allSeats.map((ele,index)=>{
            if(ele)
             return <div className={reservedSeats.includes(index)?"seat-icon selected":"seat-icon occupied"} key={index}><EventSeatIcon /><p>{index}</p></div>;
             else 
             return <div className={"seat-icon"} key={index}><EventSeatIcon /><p>{index}</p></div>;
          })}
          {noseats===true && <h3>No seats available</h3>}
        </div>
        <div className="next-btn">
          <button onClick={handleSubmit}>Book More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
