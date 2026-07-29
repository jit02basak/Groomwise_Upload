import React from 'react'
import Link from 'next/link'

const Menu_nav = () => {
  return (
    <div className="menu font-normal tracking-tight flex items-center gap-6 text-sm md:text-base">
      <Link href="/" className='hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors duration-200'>Home</Link>
      <Link href="/hair-style" className='hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors duration-200'>Hair style</Link>
      <Link href="/skin-care" className='hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors duration-200'>Skin care</Link>
      <Link href="/dashboard" className='hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors duration-200'>Dashboard</Link>
    </div>
  )
}

export default Menu_nav