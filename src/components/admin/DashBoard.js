import { useRef, useState } from "react";
import TripForm from "./TripForm";

import { HiOutlineExclamationCircle, HiOutlinePrinter } from 'react-icons/hi'
import { IoArrowBack } from 'react-icons/io5'

import { deleteDoc, doc } from '@firebase/firestore'
import { db } from "../../firebase/firebase_Config";
import { Button, Modal } from "flowbite-react";

import { useReactToPrint } from 'react-to-print'
import TripCard from "./TripCard";

const DashBoard = ({ trips, reservations }) => {
    const [selectedTrips, setSelectedTrips] = useState(null);
    const [selectedTripRes, setSelectedTripRes] = useState(null);
    const [trip, setTrip] = useState(true);
    const [booking, setBooking] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [printModal, setPrintModal] = useState(false);

    const [id, setID] = useState('');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Trip_Card',
        onAfterPrint: () => alert('Print Success')
    })

    const deleteTrip = async (id) => {

        const tripDoc = doc(db, "trip_info", id);
        await deleteDoc(tripDoc);
        window.location.reload();
    };



    return (
        <section className="bg-white  h-screen overflow-x-hidden">
            <div className=" px-6 py-12 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-4xl ">Admin Dashboard</h1>

                <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
                    <div className="lg:mx-12">
                        <h1 className="text-xl font-semibold text-gray-800 ">Menu</h1>

                        <div className="mt-4 space-y-4 lg:mt-8">
                            <a href="/" className="text-gray-500 hover:underline flex items-center gap-2 "><IoArrowBack /> Back</a>
                            <button onClick={() => { setTrip(true); setBooking(false) }} className={trip ? "block text-blue-500 text-2xl" : "block text-gray-500 text-2xl"}>Trips</button>
                            <button onClick={() => { setTrip(false); setBooking(true) }} className={booking ? "block text-blue-500 text-2xl" : "block text-gray-500 text-2xl "}>Booking</button>


                        </div>
                    </div>

                    {trip && <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                        <div>
                            <div className="py-8">

                                <button data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" className="px-8 py-3 bg-black font-bold text-white rounded-full"
                                    onClick={() => { setSelectedTrips(null); }}
                                >Add Trip</button>
                            </div>
                            <h1 className="mx-4 text-xl text-gray-700">Trips</h1>


                            <div className="overflow-x-auto">
                                <div className="flex items-center justify-center rounded-lg shadow-lg bg-gray-100 font-sans overflow-hidden">
                                    <div className="w-full px-2">

                                        <div className="bg-white shadow-md rounded my-6">
                                            <table className="min-w-max w-full table-auto">
                                                <thead>
                                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                        <th className="py-3 px-6 text-left">Cover</th>
                                                        <th className="py-3 px-6 text-left">Destination</th>
                                                        <th className="py-3 px-6 text-center">departure date</th>
                                                        <th className="py-3 px-6 text-center">arrival date</th>
                                                        <th className="py-3 px-6 text-center">availability</th>
                                                        <th className="py-3 px-6 text-center">description</th>
                                                        <th className="py-3 px-6 text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-600 text-sm font-light">
                                                    {trips.map((trip) => (
                                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={trip.id}>
                                                            <td className="py-3 text-left w-60">
                                                                <img className="object-cover w-full z-[-10] px-2 rounded-xl h-40" src={`${trip.coverUrl}`} alt="" />
                                                            </td>
                                                            <td className="py-3 px-6 text-left w-32">
                                                                <span>{trip.destination}</span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center w-32">
                                                                <span>{trip.departure_date}</span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center w-32">
                                                                <span>{trip.arrival_date}</span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center w-32">
                                                                {trip.availability ? <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Available</span> :
                                                                    <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Not Available</span>
                                                                }

                                                            </td>

                                                            <td className="py-3 px-6 text-center w-32" title={trip.trip_description}>
                                                                <span>{trip.trip_description.substring(0, 100) + "..."}</span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center w-32">
                                                                <div className="flex item-center justify-center">

                                                                    <div className="w-10 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer"
                                                                        data-bs-toggle="modal" data-bs-target="#exampleModalScrollable"
                                                                        onClick={() => { setSelectedTrips(trip) }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div onClick={() => { setID(trip.id); setDeleteModal(true) }} className="w-10 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    }
                    {booking &&
                        <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                            <div>
                                <h1 className="mx-4 text-xl text-gray-700">Booking</h1>
                                <div className="overflow-x-auto">
                                    <div className="flex items-center justify-center rounded-lg shadow-lg bg-gray-100 font-sans overflow-hidden">
                                        <div className="w-full px-2">
                                            <div className="bg-white shadow-md rounded my-6">
                                                <table className="min-w-max w-full table-auto">
                                                    <thead>
                                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal" >
                                                            <th className="py-3 px-6 text-left">Full Name</th>
                                                            <th className="py-3 px-6 text-left">email</th>
                                                            <th className="py-3 px-6 text-center">phone</th>
                                                            <th className="py-3 px-6 text-center">country</th>
                                                            <th className="py-3 px-6 text-center">trip</th>
                                                            <th className="py-3 px-6 text-center">Action</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-600 text-sm font-light">
                                                        {reservations.map((res) => (
                                                            <tr onMouseEnter={() => { setSelectedTripRes(res) }} className="border-b border-gray-200 hover:bg-gray-100" key={res.id}>
                                                                <td className="py-3 px-6 text-left w-32">
                                                                    <span>{res.fullName}</span>
                                                                </td>
                                                                <td className="py-3 px-6 text-left w-32">
                                                                    <span>{res.email}</span>
                                                                </td>
                                                                <td className="py-3 px-6 text-center w-32">
                                                                    <span>{res.phone}</span>
                                                                </td>
                                                                <td className="py-3 px-6 text-center w-32">
                                                                    <span>{res.country}</span>
                                                                </td>


                                                                <td className="py-3 px-6 text-center">
                                                                    <div className="flex justify-center">
                                                                        <div className="flex flex-col md:flex-row md:max-w-2xl rounded-lg bg-white shadow-lg">
                                                                            <img className=" w-full h-72 object-cover md:w-96 rounded-t-lg md:rounded-none md:rounded-l-lg" src={`${res.trip.coverUrl}`} alt="" />
                                                                            <div className="p-6 flex flex-col justify-start">
                                                                                <h5 className="text-gray-900 text-xl font-medium mb-2">Trip Destination : {res.trip.destination}</h5>
                                                                                <p className="text-gray-700 text-base mb-4">
                                                                                    {res.trip.trip_description}
                                                                                </p>
                                                                                <p className="block mt-4 text-sm font-semibold text-gray-800">
                                                                                    Departure Date : {res.trip.departure_date}
                                                                                </p>
                                                                                <p className="block mt-4 text-sm font-semibold text-gray-800">
                                                                                    Arrival Date : {res.trip.arrival_date}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => { setPrintModal(true) }} class="bg-violet-500 hover:bg-violet-600 text-violet-100 font-bold py-2 px-4 rounded inline-flex items-center">
                                                                        <HiOutlinePrinter size={30}/>
                                                                        <span className="text-xl">Print</span>
                                                                    </button>
                                                                    
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    <TripForm trip={selectedTrips} />
                </div>
            </div>




            {/* Confirm Print Modal*/}
            <Modal
                show={printModal}
                size="xl"
                popup={true}
                onClose={() => { setPrintModal(false) }}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlinePrinter className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <div className="flex mx-auto justify-center" ref={componentRef}>
                            {selectedTripRes !== null && <div class="p-10">

                                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                    <img class="w-full" src={`${selectedTripRes.trip.coverUrl}`} alt="Mountain" />
                                    <div class="px-6 py-4">
                                        <div class="font-bold text-xl mb-2">{selectedTripRes.trip.destination}</div>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Date Departure : {selectedTripRes.trip.departure_date}</span>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Date Arrival : {selectedTripRes.trip.arrival_date}</span>
                                        <p class="text-gray-700 text-base">
                                            {selectedTripRes.trip.trip_description}
                                        </p>
                                    </div>
                                    <div class="flex flex-col px-6 pt-4 pb-2">
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-bold text-gray-700 mr-2 mb-2">Full Name : {selectedTripRes.fullName}</span>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-bold text-gray-700 mr-2 mb-2">Email : {selectedTripRes.email}</span>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-bold text-gray-700 mr-2 mb-2">Country : {selectedTripRes.country}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                color="success"
                                onClick={() => { handlePrint() }}
                            >
                                Print
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => { setPrintModal(false) }}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* Confirm Delete Modal*/}
            <Modal
                show={deleteModal}
                size="md"
                popup={true}
                onClose={() => { setDeleteModal(false) }}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => { deleteTrip(id) }}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => { setDeleteModal(false) }}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </section>
    );
}

export default DashBoard;