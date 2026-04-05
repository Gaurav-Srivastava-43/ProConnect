import React, { useState } from 'react';
import '../styles/landingpage.css';

import ProConnectLogo from '../images/ProConnectLogo_Horizontal.png';
import About1 from '../images/about-1.jpg';
import About2 from '../images/about-2.jpg';

import Login from '../components/Login';
import Register from '../components/Register';

const LandingPage = () => {

    const [isLoginBox, setIsLoginBox] = useState(true);


  return (
    <div className='landingPage'>
        
        <div className="landing-header">
            <span className="landing-header-logo"><img src={ProConnectLogo} alt="" /></span>
            <ul>
                <li className='header-li'><a href="#home">Home</a></li>
                <li className='header-li'><a href="#about">About</a> </li>
                <li className='header-li'><a href="#home">Join now</a></li>
            </ul>
        </div>


        <div className="landing-body">

            <div className="landing-hero" id='home'>
                <div className="landing-hero-content">
                    <h1>ProConnect</h1>
                    <p>A streamlined social hub designed to turn shared passions into meaningful, real-world connections. </p>

                    <div className="authentication-form">

                        { isLoginBox ?

                            <Login setIsLoginBox={setIsLoginBox} />
                            :
                            <Register setIsLoginBox={setIsLoginBox} />
                        }

                    </div>

                </div>
                <div className="landing-hero-image">
                    
                        <div id='landing-image-sidebar-left'></div>
                        <div className="back"></div>
                        <div id='landing-image-sidebar-right'></div>
                   
                </div>
            </div>

            <div className="landing-about" id='about'>

                <div className="about-1">
                    <img src={About1} className='about-1-img' alt="" />
                    <div className="about-1-content">

                        <h3>Networking</h3>
                        <p>Discover people, trending communities, and local groups that align with your lifestyle and values.
                            Bridge the gap between digital interaction and real-world belonging through shared passions.
                            Engage in meaningful conversations within spaces designed for authentic self-expression.
                            Build a social circle that doesn't just fill your feed, but enriches your daily life.
                        </p>
                        <a href='#home'>Join now!!</a>

                    </div>
                </div>
                <div className="about-2">
                    <div className="about-2-content">
                        <h3>Story Showcasing</h3>
                        <p>Go beyond a basic profile with a rich, multi-media feed that highlights moments of your life, personal milestones, and creative content.
                            Transform your digital presence into a living gallery that tells the full story of who you are.
                            From spontaneous daily updates to major career achievements, archive every chapter with stunning clarity.
                            Build a lasting legacy of memories and ideas that resonates with your community and inspires those around you.</p>
                        <a href='#home'>Join now!!</a>
                    </div>
                    <img src={About2} className='about-2-img' alt="" />
                </div>

            </div>

            <div className="footer">
                <p>All rights reserved - &#169; ProConnect.com</p>
            </div>


        </div>

    </div>
  )
}

export default LandingPage