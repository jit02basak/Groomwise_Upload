import React from 'react'
import Link from 'next/link'

const HeroSubheading = () => {
    return (
        <div className="hero_subheading_container w-[80vw] h-auto  absolute  top-[70%] flex justify-between items-center pr-7 ">
            <div className="subheading w-[40vw]  text-xl font-normal  px-8  tracking-tight text-zinc-500">
                <p>Scan your face, discover hairstyles that suit you, and solve hair & skin problems effortlessly.</p>
            </div>
            {/* Note: button tag removed — a <button> inside a <Link> (which renders as <a>) is invalid HTML
                and causes Next.js SSR hydration errors. The Link itself carries all the styling. */}
            <Link href="/hair-style" className="scan_btn w-[10vw] h-[5vh] bg-[#0F131F] dark:bg-zinc-100 flex justify-center items-center text-center text-xl font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 text-zinc-100 dark:text-zinc-900 cursor-pointer">
                Upload & scan
            </Link>
        </div>
    )
}

export default HeroSubheading