import React from 'react'

const HeroImageAnimationSection = () => {
  return (
    < div >
    <div className="hero_image_container w-full  h-screen absolute  top-[85%] flex  px-5 ">
                <div className="img_container  w-[8vw] h-[45vh] ml-3 rounded-xl bg-taupe-600 overflow-hidden">
                    <img src="https://i.pinimg.com/736x/49/5c/ce/495ccec1bc9d8a7c4e7364fd402a1bd5.jpg" alt="" className='  w-full h-full object-cover ' />
                </div>
                <div className="img_container  w-[10vw] h-[45vh] ml-3 rounded-xl bg-taupe-600 overflow-hidden">
                    <img src="https://i.pinimg.com/736x/8f/81/4e/8f814e22758d0dff299e87ce4dc43213.jpg" alt=""  className='  w-full h-full object-cover '  />

                </div>
                <div className="img_container  w-[13vw] h-[45vh] ml-3 rounded-xl bg-taupe-600 overflow-hidden">
                    <img src="https://i.pinimg.com/736x/01/06/c1/0106c1cfa60853532a4f84e2a7290974.jpg" alt=""  className='  w-full h-full object-cover '  />

                </div>
                <div className="img_container  w-[18vw] h-[45vh] ml-3 rounded-xl bg-taupe-600 overflow-hidden">
                    <img src="https://i.pinimg.com/736x/a6/60/c7/a660c77b12ada1e4923dd1fa69fa4f74.jpg" alt="" className='  w-full h-full object-cover '  />

                </div>
                <div className="img_container  w-[24vw] h-[45vh] ml-3 rounded-xl bg-taupe-600 overflow-hidden">
                    <img src="https://i.pinimg.com/1200x/77/1c/5c/771c5c3d14357055d601ec9e4b31225d.jpg" alt=""  className='  w-full h-full object-cover ' />

                </div>
            </div> 
            
    </div>
    )
}

export default HeroImageAnimationSection