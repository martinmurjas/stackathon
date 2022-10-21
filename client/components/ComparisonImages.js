import React from 'react'
import spike1 from './images/spike1.png'
import spike1B from './images/spike1.1.png'
import spike2 from './images/spike2.png'
import spike2B from './images/spike2.2.png'

export const ComparisonImages = () => {
  return (
    <div>
      <div style={{display: 'flex'}}>
            <img src={spike1B} alt="" width='200px' /> 
            <img src={spike1} alt="" width='200px'/>
          </div>
          <div style={{display: 'flex'}}>
            <img src={spike2B} alt="" width='200px'/>
            <img src={spike2} alt="" width='200px'/>
          </div>
    </div>
  )
}
