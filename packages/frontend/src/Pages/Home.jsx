import React, {  useEffect }from 'react';
import { useAxiosPrivate } from '../Hooks';
import './Home.css';
import HomeLogo from '../Components/Logo/HomeLogo';
import Logo from '../Components/Logo/Logo';
import PHImg from '../Images/phi.png';

const Home = () => {
  // const axiosPrivate = useAxiosPrivate();
  // useEffect(()=>{
  //   const getNotes = async () => {
  //     try{
  //       const resp = await axiosPrivate.get('/api/v1/note/getallnotes')
  //       console.log(resp)
  //     }catch(e){
  //       console.log(e);
  //     }
  //   }

  //   getNotes();
  // });

  return (
    <div className='page-container '>
      <div className='home-content-container'>
        <HomeLogo/>
        <Logo  fontSize = '6rem'></Logo>
        <div className='home-sign-btn'>
          <h5>Sign In</h5>
        </div>
        <div className='home-title'>
        The best place for all your photos, files, notes, mail, and more.
        </div>
        <div className='home-info'>
          <div className='info-card ashadow rounded-dialog'>
            <img className="home-info-img" src={PHImg}/>
            <div className="info-title">Easily access apps and data from your iPhone on the web</div>
            <div className="info-desc">
            iCloud is essential for keeping personal information from your devices safe, up to date, and available wherever you are. At iCloud.com, you can access your photos, files, and more from any web browser. Changes you make will sync to your iPhone and other devices, so you’re always up to date.
            </div>
          </div>
          <div className='info-card ashadow rounded-dialog'>
            <img className="home-info-img" src={PHImg}/>
            <div className="info-title">Easily access apps and data from your iPhone on the web</div>
            <div className="info-desc">
            iCloud is essential for keeping personal information from your devices safe, up to date, and available wherever you are. At iCloud.com, you can access your photos, files, and more from any web browser. Changes you make will sync to your iPhone and other devices, so you’re always up to date.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home