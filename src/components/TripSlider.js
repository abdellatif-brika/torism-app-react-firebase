
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import { useEffect, useState } from "react";
import { db } from "../firebase/firebase_Config";

import { collection, addDoc } from '@firebase/firestore'

const TripSlider = ({ trips }) => {


    const [countries, setCountries] = useState([]);

    const [selectedTrips, setSelectedTrips] = useState();
    const [alert, setAlerts] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');



    const bookTrip = async () => {
        setAlerts(false);
        if (fullName === "" || email === "" || phone === "" || country === "") {
            setAlerts(true);
            return;
        }

        const TripResrvCollectionRef = collection(db, "trip_reservations");
        let reservation = { fullName: fullName, email: email, phone: phone, country: country, trip: selectedTrips };
        await addDoc(TripResrvCollectionRef, reservation);

        setAlertSucc(true);

        setInterval(() => {
            window.location.replace('/');
        }, 2000)

    }

    useEffect(() => {

        const get_Countries = () => {
            fetch('countries.json'
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setCountries(myJson)
                    //console.log(myJson);
                });
        }
        get_Countries();

    }, [])

    return (
        <div id='Booking' className='pt-12 pb-0 max-w-[1320px] mx-auto '>
            <div className='container'>
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-800 capitalize">Booking</h1>
                </div>

                <div className="flex">

                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {trips.map((trip) => (
                            <SwiperSlide key={trip.id}>

                                <div className="mt-8 lg:flex flex-col lg:items-center   p-4  rounded-lg">
                                    <img className="object-cover w-full mb-2 z-[-10] lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96 shadow-xl" src={`${trip.coverUrl}`} alt="" />

                                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 shadow-xl p-4 rounded-xl border border-black ">
                                        {trip.availability ? <p className="text-xl text-green-500 uppercase">Available</p> :
                                            <p className="text-xl text-red-500 uppercase">
                                                Not Available</p>

                                        }
                                        <h1 className="block mt-4 text-2xl font-semibold text-gray-800 md:text-3xl">
                                            Trip Destination : {trip.destination}
                                        </h1>
                                        <div>
                                            <p className="block mt-4 text-xl font-semibold text-gray-800">
                                                Departure Date : {trip.departure_date}
                                            </p>
                                            <p className="block mt-4 text-xl font-semibold text-gray-800">
                                                Arrival Date : {trip.arrival_date}
                                            </p>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-500 md:text-sm">
                                            {trip.trip_description}
                                        </p>

                                        <div className="py-8">

                                            <button data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" className="px-8 py-3 bg-black font-bold text-white rounded-full"
                                                onClick={() => { setSelectedTrips(trip) }}
                                            >Book Your Trip</button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>




            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModalScrollable" tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                Booking Trip
                            </h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {alert && <div className="alert bg-red-100  py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                            <strong className="mr-1">Alert! </strong> All Fields Required.
                            <button onClick={() => { setAlerts(false) }} type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"></button>
                        </div>}

                        {alertSucc && <div className="alert bg-green-100  py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                            <strong className="mr-1">Success! </strong> Booking Completed.
                            <button onClick={() => { setAlertSucc(false) }} type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"></button>
                        </div>}
                        <div className="modal-body relative p-4">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="email" name="floating_fullName" id="floating_fullName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(event) => { setFullName(event.target.value) }} />
                                <label htmlFor="floating_fullName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                >Full Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(event) => { setEmail(event.target.value) }} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                >Email address</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={10} name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                        onChange={(event) => { setPhone(event.target.value) }} />
                                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                    >Phone number (0613456789)</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    {/* <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                        onChange={(event) => { setCountry(event.target.value) }} /> */}


                                    <select id="countries" className="bg-gray-50 border px-4 border-gray-300 text-black rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(event) => { setCountry(event.target.value) }}>
                                        <option defaultValue>Choose Your Country</option>
                                        
                                        {countries.map((count) => {
                                            return <option key={count.name} value={count.name}>{count.name}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                                    <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={`${selectedTrips && selectedTrips.coverUrl}`} alt="" />
                                    <div className="p-6 flex flex-col justify-start">
                                        <h5 className="text-gray-900 text-xl font-medium mb-2">Trip Destination : {selectedTrips && selectedTrips.destination}</h5>
                                        <p className="text-gray-700 text-base mb-4">
                                            {selectedTrips && selectedTrips.trip_description}
                                        </p>
                                        <p className="block mt-4 text-sm font-semibold text-gray-800">
                                            Departure Date : {selectedTrips && selectedTrips.departure_date}
                                        </p>
                                        <p className="block mt-4 text-sm font-semibold text-gray-800">
                                            Arrival Date : {selectedTrips && selectedTrips.arrival_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button"
                                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button"
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                onClick={() => { bookTrip() }}
                            >
                                Book Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripSlider;