import React, { useState} from 'react';
import './Header.css';
import Logo4 from '../../assets/logo4.png';


const Header = () => {
  const [setMenuOpened] = useState (true)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="header">
      <img src={Logo4} alt=""  className='logo'/>

      <ul className='headermenu'>
        <li onClick={()=>{setMenuOpened(true); scrollToSection('Home')}}>Home</li>
        <li onClick={()=>{setMenuOpened(true); scrollToSection('program')}}>Program</li>
        <li onClick={()=>{setMenuOpened(true); scrollToSection('why-us')}}>Why us</li>
        <li onClick={()=>{setMenuOpened(true); scrollToSection('plans')}}>Plans</li>
        <li onClick={()=>{setMenuOpened(true); scrollToSection('testimonials')}}>Testimonials</li>
      </ul>

     
    </div>
  );
};

export default Header;

