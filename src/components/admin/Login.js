import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase_Config";

const Login = () => {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const [msg, setMsg] = useState('');
    const [alert, setAlerts] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);

    const handleSignIn = () => {
        setAlertSucc(false);
        setAlerts(false);
        if (email === "" || psw === "") {
            setAlertSucc(false);
            setAlerts(true);
            setMsg('Please Fill In Email and password !!');
            return;
        }
        signInWithEmailAndPassword(auth, email, psw)
            .then(() => {
                setAlertSucc(true);
                setAlerts(false);
               
                window.location.replace('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                setAlertSucc(false);
                setAlerts(true);
                setMsg(errorCode);
                console.log(errorCode)
            });

    }
    
useEffect(()=>{
    const currentUser = auth.currentUser;
    if (currentUser) {
        window.location.replace('/');
    }
},[])
    return (
        <section className=" ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-50 h-screen">

                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 bg-black/5 px-4 py-2 shadow-lg rounded-xl">
                    <img className="w-8 h-8 mr-2 rotate-[-60deg]" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Back
                </a>
                {alert && <div className="alert bg-red-100  py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                    <strong className="mr-1">Alert! </strong> {msg}
                    <button onClick={() => { setAlerts(false) }} type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"></button>
                </div>}

                {alertSucc && <div className="alert bg-green-100  py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                    <strong className="mr-1">Success! </strong> Log in Successfully .
                    <button onClick={() => { setAlertSucc(false) }} type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"></button>
                </div>}


                <div className="w-full shadow-lg bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Admin Login Form
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""
                                    onChange={(event) => { setEmail(event.target.value) }} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""
                                    onChange={(event) => { setPsw(event.target.value) }} />
                            </div>

                            <button onClick={() => { handleSignIn() }} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;