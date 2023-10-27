import React, {  useEffect }from 'react';
import { useAxiosPrivate } from '../Hooks';
import './Home.css';
import book from '../Images/book.gif'

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
      <div className='content-container'>
        <div className="home-page-logo-container">
          <img src={book} className="" />
        </div>
      </div>
    </div>
  )
}

export default Home