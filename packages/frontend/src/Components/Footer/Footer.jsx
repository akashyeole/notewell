import './Footer.css';
import React from 'react'

const Footer = () => {
  return (
    <div class = 'footer-container'>
        <footer class = 'footer'>
          <div className="footer-menu">
            <a href="" className="footer__menu__ss">System Status</a>
            <div className="footer_pipe">|</div>
            <a href="" className="footer__menu__pp">Privacy Policy</a>
            <div className="footer_pipe">|</div>
            <a href="" className="footer__menu__tnc">Terms & Conditions</a>
          </div>
          <div className="copyright-det">
            Copyright © {(new Date).getFullYear()} Notewell. All rights reserved.
          </div>
        </footer>
    </div>
  )
}

export default Footer