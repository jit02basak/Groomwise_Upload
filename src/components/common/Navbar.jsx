import React from 'react'
import LogoNav from './LogoNav'
import MenuNav from './MenuNav'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <>
      <div className="nav h-auto w-[80vw] mx-auto flex justify-between items-center px-5 py-5 text-[#0F131F] dark:text-zinc-100 transition-colors duration-300" >
        <LogoNav/>
        <div className="flex items-center gap-6">
          <MenuNav/>
          <ThemeToggle/>
        </div>
      </div>
    </>
  )
}

export default Navbar