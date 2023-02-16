import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TripSlider from "./components/TripSlider";
import Navbar from "./components/Navbar";
import Offers from "./components/Offers";
import Plan from "./components/Plan";
import Rooms from "./components/Rooms";
import Login from "./components/admin/Login";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashBoard from "./components/admin/DashBoard";
import { collection, getDocs, query } from '@firebase/firestore'
import { db } from "./firebase/firebase_Config";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";


function App() {
  const [trips, setTrips] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const tripsCollectionRef = collection(db, "trip_info");
    const reservationsCollectionRef = collection(db, "trip_reservations");
    const getTrips = async () => {
        const q = query(tripsCollectionRef);
        const data = await getDocs(q);
        setTrips(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    };
    const getReservations = async () => {
        const q = query(reservationsCollectionRef);
        const data = await getDocs(q);
        setReservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    };
    getTrips();
    getReservations();
}, [])

  return (

    <div className="ease-in-out duration-1000">
      <Router>
        <Routes>
          <Route path='/' element={[<Navbar />,<Hero />,<Offers />,<Plan />,<Rooms />,  <TripSlider trips={trips}/>,<Footer />,<BackToTop />]} />


          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/dashBoard' element={<DashBoard trips={trips} reservations={reservations}/>}/>
        </Routes>
      </Router>

    </div>

  );
}

export default App;
