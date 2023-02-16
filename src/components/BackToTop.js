import { useState } from 'react';
import {BsArrowUpCircle} from 'react-icons/bs'
import {Link} from 'react-scroll'

const BackToTop = () => {


    const[b2t,setB2t]=useState(false)

    window.addEventListener("scroll",(e)=>{
        if (window.scrollY>=100) {
            setB2t(true)
        }
        else{
            setB2t(false)
        }
    })

    return ( 
        <div className="fixed z-1 rounded-full bottom-0 right-0 mr-6 mb-6">
            {b2t && 
            <Link to="top" spy={true} smooth={true} offset={50} duration={1000} className='rounded-full'>
            <BsArrowUpCircle size={50} className="shadow-2xl text-teal-500 rounded-full cursor-pointer"/>
            </Link>
            }
        </div>
     );
}
 
export default BackToTop;