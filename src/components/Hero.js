import { Link } from "react-scroll";


const Hero = () => {
    return (

        <div id="home" className="h-screen w-full relative">
            <img
                src="https://images.unsplash.com/photo-1611043714658-af3e56bc5299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="bg-center bg-no-repeat bg-cover h-screen w-full overflow-hidden object-cover ab top-0" />
            <div className="bg-black/30 absolute top-0 left-0 w-full h-screen"></div>
            <div className="absolute top-0 w-full h-full flex flex-col items-start justify-center text-white">

                <div className="md:left-[10%] max-w-[1100px] m-auto p-4">
                    <p>All Include</p>
                    <h1 className="text-5xl font-bold md:text-7xl drop-shadow-2xl">Private Beaches & Getaways</h1>
                    <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed itaque, labore quaerat, assumenda iure impedit optio voluptate numquam, iste modi id earum eaque fuga doloremque corrupti dolore quam ullam quibusdam.</p>
                    <Link to='Booking' spy={true} smooth={true} offset={50} duration={1500} >   <button className="px-8 py-3 bg-white font-bold text-black rounded-full">
                        Book Now
                    </button></Link>


                    <div className="mt-40 opacity-70 flex items-center justify-center">
                        <img src="./scroll-down-icon.gif" className="h-40 rounded-full shadow-xl" alt="" />
                    </div>
                </div>




            </div>

        </div>



    );
}

export default Hero;