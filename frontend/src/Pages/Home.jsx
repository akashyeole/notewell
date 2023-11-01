import React, {  useEffect }from 'react';
import { useAxiosPrivate } from '../Hooks';
import './Home.css';
import HomeLogo from '../Components/Logo/HomeLogo';
import Logo from '../Components/Logo/Logo';

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
    const getNotes = async () => {
      try{
        const resp = await axiosPrivate.get('/api/v1/note/getallnotes')
        console.log(resp)
      }catch(e){
        console.log(e);
      }
    }

    getNotes();
  });

  return (
    <div className='page-container '>
      <div className='home-content-container'>
        <HomeLogo/>
      </div>
    </div>
  )
}

export default Home