const Rooms = () => {
    return (
        <div id="Rooms" className="max-w-[1400px] lg:h-[500px] mx-auto my-20 pt-16 lg:mb-[45%] md:mb-[20%] px-4 grid lg:grid-cols-3 gap-4 bg-[#DDE9FB]">
            {/* <div className="absolute w-full h-44 bg-slate-500 right-0 left-0"></div> */}
            <div className="lg:top-20 relative lg:col-span-1 col-span-2 drop-shadow-2xl">
                <h1 className="text-3xl font-bold">Fine Interior Rooms</h1>
                <p className="pt-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus doloribus ab alias.
                    Possimus quo ullam laborum optio blanditiis reiciendis ducimus.
                </p>
            </div>
            <div className=" grid grid-cols-2 col-span-2 gap-2">
                <img className="object-cover w-full h-full drop-shadow-2xl" src="https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" srcSet="" />
                <img className="row-span-2 object-cover w-full h-full drop-shadow-2xl" src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" srcSet="" />
                <img className="object-cover w-full h-full drop-shadow-2xl" src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" srcSet="" />
            </div>
        </div>
    );
}

export default Rooms;