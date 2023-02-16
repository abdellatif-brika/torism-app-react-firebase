import { Link } from "react-scroll";

const Plan = () => {
    return (
        <div id="Plan" className="max-w-[1400px] m-auto py-32 px-4 grid lg:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 grid-rows-6 h-[80vh] ">
                <img className="row-span-3 object-cover w-full h-full p-2 drop-shadow-2xl" src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80" alt="" />
                <img className="row-span-2 object-cover w-full h-full p-2 drop-shadow-2xl" src="https://images.unsplash.com/photo-1613425653628-23fd58c3c2b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                <img className="row-span-2 object-cover w-full h-full p-2 drop-shadow-2xl" src="https://images.unsplash.com/photo-1590504425127-1e415bb06444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                <img className="row-span-3 object-cover w-full h-full p-2 drop-shadow-2xl" src="https://images.unsplash.com/photo-1519693360201-4e53a8e0d45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                <img className="row-span-2 object-cover w-full h-full p-2 drop-shadow-2xl" src="https://images.unsplash.com/photo-1489343970971-452ba8e1548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
            </div>
            <div className="flex flex-col justify-center drop-shadow-2xl">
                <h1 className="text-5xl font-bold py-8">Plan Your Next Trip</h1>
                <p className="font-bold text-lg py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. maxime porro.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia cumque sed quia esse nisi, veniam, saepe natus ab officia amet consectetur repudiandae et numquam alias autem nulla est eveniet. Autem.</p>
                <div className="py-8">
                    <button className="px-8 py-3 mx-4 bg-white font-bold text-black rounded-full border border-black">Learn More</button>
                    <Link to='Booking' spy={true} smooth={true} offset={50} duration={1500} >
                    <button className="px-8 py-3 bg-black font-bold text-white rounded-full">Book Your Trip</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Plan;