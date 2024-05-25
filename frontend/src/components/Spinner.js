import React from 'react';
import spinner from "../assests/spin.gif";

function Spinner() {
  return (
    <div className='text-center' style={{marginTop:"35vh"}}>
      <img src={spinner} alt='spinner'></img>
    </div>
  )
}

export default Spinner
