import React from 'react'
import '../styles/Output.css'

function Outcome() {
  return (
    <div className='output'>
      <div className='output-container'>
        <div className='output-title'>
          <h1>Unstop Express</h1>
          <h2>Revervation Details</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>No of seats</th>
              <th>Seats numbers</th>
              <th>Is_available</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>80</td>
                <td>12,232,121</td>
                <td>avaible</td>
              </tr>
          </tbody>
        </table>
        <div className='submit'>
          <button>Reserve Seats & Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Outcome