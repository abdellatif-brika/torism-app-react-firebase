import { useEffect, useState } from "react";



import { collection, addDoc, doc, updateDoc } from '@firebase/firestore'
import { db } from "../../firebase/firebase_Config";

const TripForm = ({ trip }) => {

    const [alert, setAlerts] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);


    const [destination, setDestination] = useState('');
    const [departure_date, setDeparture_date] = useState('');
    const [arrival_date, setArrival_date] = useState('');
    const [trip_description, setTrip_description] = useState('');
    const [availability, setAvailability] = useState('');
    const [coverUrl, setCoverUrl] = useState('');

    const AddTrip = async () => {
        setAlerts(false);
        if (destination === "" || departure_date === "" || arrival_date === "" || trip_description === "" || availability === "" || coverUrl === "") {
            setAlerts(true);
            return;
        }

        const TripInfoCollectionRef = collection(db, "trip_info");
        let tripInfo = { destination: destination, departure_date: departure_date, arrival_date: arrival_date, trip_description: trip_description, availability: availability, coverUrl: coverUrl };
        await addDoc(TripInfoCollectionRef, tripInfo);

        setAlertSucc(true);

        window.location.replace('/dashBoard');

    }
    const editTrip = async () => {
        setAlerts(false);
        if (destination === "" || departure_date === "" || arrival_date === "" || trip_description === "" || availability === "" || coverUrl === "") {
            setAlerts(true);
            return;
        }

        let tripInfo = { destination: destination, departure_date: departure_date, arrival_date: arrival_date, trip_description: trip_description, availability: availability, coverUrl: coverUrl };

        const tripDoc = doc(db, "trip_info", trip.id);
        await updateDoc(tripDoc, tripInfo);

        setAlertSucc(true);

        window.location.replace('/dashBoard');

    }

    useEffect(() => {

        if (trip !== null) {
            console.log("Trip " + trip.availability);
            console.log("Trip " + trip);
            setDestination(trip.destination);
            setDeparture_date(trip.departure_date);
            setArrival_date(trip.arrival_date);
            setTrip_description(trip.trip_description);
            setAvailability(trip.availability);
            setCoverUrl(trip.coverUrl);
        }
    }, [trip])


    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModalScrollable" tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                <div
                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            {trip === undefined ? 'Add Trip' : 'Edit Trip'}
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
                        <strong className="mr-1">Success! </strong>{trip === null ? 'Adding Trip Completed.' : 'Editing Trip Completed.'}
                        <button onClick={() => { setAlertSucc(false) }} type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"></button>
                    </div>}
                    <div className="modal-body relative p-4">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_destination" id="floating_destination" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={(event) => { setDestination(event.target.value) }}
                                value={destination} />
                            <label htmlFor="floating_destination" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                            >Trip destination</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <textarea type="text" name="floating_description" id="floating_description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={(event) => { setTrip_description(event.target.value) }}
                                value={trip_description} ></textarea>
                            <label htmlFor="floating_description" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                            >Description</label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="date" name="floating_Departure_date" id="floating_Departure_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(event) => { setDeparture_date(event.target.value) }}
                                />
                                <label htmlFor="floating_Departure_date" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                >Departure Date {departure_date}</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="date" name="floating_Arrival_date" id="floating_Arrival_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(event) => { setArrival_date(event.target.value) }} />
                                <label htmlFor="floating_Arrival_date" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                >Arrival Date {arrival_date}</label>
                            </div>
                        </div>
                        <div className="flex relative z-0 w-full mb-6 group">

                            <label htmlFor="floating_Availability" className="text-gray-500 peer-focus:text-blue-600 "
                            >Availability</label>


                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full 
                            flex items-center gap-2 ml-4">
                                <input type="radio" checked={availability===true && true} name="floating_Availability" id="floating_Availability" className="block  px-0 text-gray-900 bg-transparent  focus:outline-none focus:ring-0 peer" placeholder=" " required
                                    onChange={() => { setAvailability(true) }} />
                                Available
                                </span> 
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full
                                items-center gap-2 flex   
                                ml-4">
                                <input type="radio" checked={availability===false && true}   name="floating_Availability" id="floating_Availability" className="block  px-0  text-gray-900 bg-transparent  focus:outline-none focus:ring-0 peer" placeholder=" " required
                                    onChange={() => { setAvailability(false) }} />
                                Not Available</span>
                           
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_CoverUrl" id="floating_CoverUrl" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                onChange={(event) => { setCoverUrl(event.target.value) }}
                                value={coverUrl} />
                            <label htmlFor="floating_CoverUrl" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                            >Cover Url</label>
                        </div>


                    </div>
                    <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button"
                            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {trip === null ? <button type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                            onClick={() => { AddTrip() }}
                        >
                            Add Trip
                        </button> :
                            <button type="button"
                                className="inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                onClick={() => { editTrip() }}
                            >
                                Edit Trip
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripForm;