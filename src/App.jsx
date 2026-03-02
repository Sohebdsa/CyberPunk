// App.jsx (React component)
import { useEffect, useRef, useState } from 'react';
import { init3DScene } from './3dScript';
//import css  
import './App.css'

function App() {
  
  useEffect(()=>{
    init3DScene() 
  },[])
  

  return (
    <>
        <div className="container">
          <nav>
            <img className="nav-logo"src="logo1.png" alt="logo" />
            <ul>
              <li>
                <a href="#home">Home</a>
                <a href="#home">Gaming</a>
                <a href="#home">Community</a>
                <a href="#home">Support</a>
              </li>
            </ul>
          </nav>
          <div className="hero">
            <img className="logo" src="./logo1.png" alt="logo" />
            <canvas id='canvas'>
            </canvas>
          </div>
        </div>
    </>
  );
}

export default App;
