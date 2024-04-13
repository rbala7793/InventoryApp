import React from 'react'
import Header from '../Header/Header'
import Foot from '../Foot/Foot'
 

const Layout = ({children}) => {
  return (
    < >
      <Header />
        <div style={{minHeight:"80vh"}} className='--pad'>
        {children}
       </div>
       <Foot />
    </ >
  )
}

export default Layout