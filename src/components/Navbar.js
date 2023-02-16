import { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoIosClose } from 'react-icons/io'
import { RiAdminLine } from 'react-icons/ri'
import { MdDashboard, MdLogout } from 'react-icons/md'
import { Link } from 'react-scroll';
import logo from '../assets/logo.png';
import { auth } from '../firebase/firebase_Config';
import { signOut } from 'firebase/auth';



const Navbar = () => {

    const [b2t, setB2t] = useState(false)
    const [logged, setLogged] = useState(false)

    window.addEventListener("scroll", (e) => {
        if (window.scrollY >= 800) {
            setB2t(true)
        }
        else {
            setB2t(false)
        }
    })

    const [showNav, setShowNav] = useState(false)

    const toggelNav = () => {
        setShowNav(!showNav);
    }

    const currentUser = auth.currentUser;
    
    const logOut = () => {

        signOut(auth).then(() => {
            window.location.replace('/');
        }).catch((error) => {
            console.log(error);
        });

    }


    return (
        <nav >
            <div id='top' className='absolute top-[-50px]'></div>
            <div className='z-[1] w-full flex p-4 justify-between text-white items-center fixed'>
                <img src={logo} alt="logo" className='h-12' />
                <div className='flex items-center gap-3'>
                    <HiMenuAlt3  title='Menu' size={50} className={!b2t ? 'cursor-pointer hover:scale-110 ease-in-out duration-500' : 'cursor-pointer hover:scale-110 ease-in-out duration-500 text-black'} onClick={toggelNav} />
                    <span className={!b2t ? 'text-3xl' : 'text-black text-3xl'}>|</span>
                    {!currentUser ? <a href='/login'>
                        <RiAdminLine  title='Log In' size={40} className={!b2t ? 'cursor-pointer hover:scale-110 ease-in-out duration-500' : 'cursor-pointer hover:scale-110 ease-in-out duration-500 text-black'} /></a>
                        :
                        <div className='flex items-center gap-3'>
                            <a href='/dashboard'>
                            <MdDashboard title='Dashboard' size={50} className={!b2t ? 'cursor-pointer hover:scale-110 ease-in-out duration-500' : 'cursor-pointer hover:scale-110 ease-in-out duration-500 text-black'}/></a>
                            <span className={!b2t ? 'text-3xl' : 'text-black text-3xl'}>|</span>
                            <MdLogout onClick={()=>{logOut()}}  title='Log Out' size={40} className={!b2t ? 'cursor-pointer hover:scale-110 ease-in-out duration-500' : 'cursor-pointer hover:scale-110 ease-in-out duration-500 text-black'} />
                        </div>
                    }
                </div>

            </div>



            <div className={!showNav ? "bg-black h-screen text-white py-5 px-4 fixed top-0 left-[-100%] z-[1] w-full ease-in-out duration-1000" : "bg-black h-screen text-white py-5 px-4 fixed top-0 left-0 w-full z-[1] ease-in-out duration-1000 opacity-90"}>
                <div className='flex justify-between items-center'>
                    <img src={logo} alt="logo" className='h-12' />
                    <div className='flex items-center gap-3'>
                        <IoIosClose size={60} className={'cursor-pointer hover:scale-110 ease-in-out duration-500 text-white'} onClick={toggelNav} />
                        <span className={!b2t ? 'text-3xl' : 'text-white text-3xl'}>|</span>

                       

                            {!currentUser ?  <a href='/login'>
                            <RiAdminLine size={40} className={'cursor-pointer hover:scale-110 ease-in-out duration-500 text-white'} /></a>
                        :
                        <div className='flex items-center gap-3'>
                            <a href='/dashboard'>
                            <MdDashboard title='Dashboard' size={50} className='cursor-pointer hover:scale-110 ease-in-out duration-500 text-white'/></a>
                            <span className='text-white text-3xl'>|</span>
                            <MdLogout onClick={()=>{logOut()}}  title='Log Out' size={40} className='cursor-pointer hover:scale-110 ease-in-out duration-500 text-white' />
                        </div>
                    }
                    </div>

                </div>
                <div className='pt-48'>
                    <ul className='flex flex-col items-center gap-10 '>
                        <Link onClick={() => { toggelNav() }} to='top' spy={true} smooth={true} offset={50} duration={1500} >  <li className='text-3xl font-bold cursor-pointer'>Home</li></Link>
                        <Link onClick={() => { toggelNav() }} to='Plan' spy={true} smooth={true} offset={50} duration={1500} > <li className='text-3xl font-bold cursor-pointer'>Plan</li></Link>
                        <Link onClick={() => { toggelNav() }} to='Rooms' spy={true} smooth={true} offset={50} duration={1500} > <li className='text-3xl font-bold cursor-pointer'>Rooms</li></Link>
                        <Link onClick={() => { toggelNav() }} to='Booking' spy={true} smooth={true} offset={50} duration={1500} > <li className='text-3xl font-bold cursor-pointer'>Booking</li></Link>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;