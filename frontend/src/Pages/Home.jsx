import React, { useContext }from 'react'
import authContext from '../Context/authentication/authContext'

const Home = () => {
  const { auth } = useContext(authContext);
  return (
    <div className='page-container'>
      {
        auth.token && <div>{auth.token}</div>
      }
      {
        !auth.token && <div>Please Login</div>
      }
    </div>
  )
}

export default Home