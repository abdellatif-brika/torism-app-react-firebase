import { BsFacebook,BsInstagram, BsTwitter,BsPinterest} from 'react-icons/bs'

const Footer = () => {
    const year=new Date()
    return ( 
        <div className=" m-auto pt-16 px-4 bg-[#121726] text-white mt-[15%]">
            <div className="lg:px-56 grid lg:grid-cols-5 grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <h6 className="text-xl font-bold uppercase">Solutions</h6>
                    <ul className="flex flex-col gap-2">
                        <li className="cursor-pointer">Travel</li>
                        <li className="cursor-pointer">Booking</li>
                        <li className="cursor-pointer">Flights</li>
                        <li className="cursor-pointer">Cruises</li>
                        <li className="cursor-pointer">Ground</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h6 className="text-xl font-bold uppercase">Support</h6>
                    <ul className="flex flex-col gap-2">
                        <li className="cursor-pointer">Pricing</li>
                        <li className="cursor-pointer">Documentation</li>
                        <li className="cursor-pointer">Tours</li>
                        <li className="cursor-pointer">Refunds</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h6 className="text-xl font-bold uppercase">Company</h6>
                    <ul className="flex flex-col gap-2">
                        <li className="cursor-pointer">About</li>
                        <li className="cursor-pointer">Blog</li>
                        <li className="cursor-pointer">Jobs</li>
                        <li className="cursor-pointer">Press</li>
                        <li className="cursor-pointer">Partners</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h6 className="text-xl font-bold uppercase">Legal</h6>
                    <ul className="flex flex-col gap-2">
                        <li className="cursor-pointer">Claims</li>
                        <li className="cursor-pointer">Privacy</li>
                        <li className="cursor-pointer">Terms</li>
                        <li className="cursor-pointer">Policies</li>
                        <li className="cursor-pointer">Conditions</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <h6 className="text-xl font-bold ">Subscribe to our newsletter</h6>
                    <p>The latest deals, articles, and resources, sent to your inbox weekly.</p>
                    <div>
                        <input type="email" name="email" placeholder="Enter Email" id="email" className="px-4 py-2 mr-4 mb-4 rounded-md w-[300px]"/>
                        <button className="border border-white px-4 py-2 rounded-md">Subscribe</button>
                    </div>
                </div>
            </div>
            <hr className="mt-12"/>
            <div className='flex flex-col lg:flex-row justify-between items-center py-8 opacity-50 lg:px-72'>
                <div>
                    {year.getFullYear()} Experiences, LLC, All Rights reserved
                </div>
                <div className='flex justify-center items-center gap-4 lg:gap-28'>
                    <BsFacebook  className='cursor-pointer hover:scale-125 ease-in-out duration-700' size={30}/>
                    <BsInstagram className='cursor-pointer hover:scale-125 ease-in-out duration-700' size={30}/>
                    <BsTwitter   className='cursor-pointer hover:scale-125 ease-in-out duration-700' size={30}/>
                    <BsPinterest className='cursor-pointer hover:scale-125 ease-in-out duration-700' size={30}/>
                </div>
            </div>
           
        </div>
     );
}
 
export default Footer;