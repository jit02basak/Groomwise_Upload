import React from 'react'
import HeroHeading from './HeroHeading'
import HeroSubheading from './HeroSubheading'
import HeroImageAnimationSection from './HeroImageAnimationSection'

const HeroSection = () => {
    return (
        <div className="hero_container w-[80.8%] h-screen   relative  text-[#0F131F] ">
            <HeroHeading />
            <HeroSubheading />
         <HeroImageAnimationSection/>
        </div>
    )
}

export default HeroSection