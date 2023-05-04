import React from 'react'
import './Join.css';
import { useRef } from 'react';
import emailjs from '@emailjs/browser'

const Join = () => {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_hr1gta3', 'template_aegqtln', form.current, '4FXI-Ex5R01K9K5X-')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };

  return (
    <div className="Join" id="join-us">
        <div className="left-j">
            <hr />
            <div>
                <span className='stroke-text'>READY TO</span>
                <span>LEVEL UP</span>
                </div>
                <div>
                <span>YOUR BODY</span>
                <span className='stroke-text'>WITH US?</span>
                </div>
        </div>
        <div className="right-j">
            <form ref={form} className="email-container" onSubmit={sendEmail}>
                <input type="email" name="user_email" placeholder =" Enter your Email address "/>
                <input type="name" name="user_email" placeholder =" Enter your name"/>
                <input type="number" name="user_email" placeholder =" Enter your number"/>
                <button className="btn btn-j">Join Now</button>              
            </form>

        </div>
    </div>
  )
}

export default Join