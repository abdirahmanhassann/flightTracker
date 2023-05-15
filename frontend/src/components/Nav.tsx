import React from 'react'
import {GiAirplaneArrival} from 'react-icons/gi'
function Nav() {
  return (
    <nav>
        <div className='rowdiv'>
        <GiAirplaneArrival style={{height:'31px',width:'31px',color:'white'}}/>
   <h5>Cheap flight ticket tracker</h5>
        </div>
    </nav>
  )
}

export default Nav