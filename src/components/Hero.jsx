import React from 'react';
import { useTypewriter, Cursor } from "react-simple-typewriter";


const Hero = () => {

  const {text} = useTypewriter({
    words:['Get Hired', 'Hire Someone', 'Freelance'],
    loop:{},
  })
  return (
    <>
    <div>
      <h1 className='text-black'>{text}</h1>
    </div>
   
    </>
  )
}

export default Hero
