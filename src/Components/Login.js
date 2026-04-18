import React, { useState,  useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../Utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';



const Login = () => {

  const [isSignInForm, setIsSignInForm]=useState('true')
  const[errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const email = useRef();
  const password= useRef();
  const name = useRef();

  const handleButtonClick = () => {
    // Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    //Sign in Sign up logic
    if(!isSignInForm){
      //Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName}));
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-" + errorMessage);
      });
    } else {
      //Sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("./browse");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-" + errorMessage);
      });
    }
  };

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className='absolute' >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/5bd3572a-0d1b-4228-aaa7-5b2dc45952b2/web/IN-en-20260413-TRIFECTA-perspective_4100808f-7dc6-4c78-8677-18db2989f7bc_large.jpg" alt="bg-image" />

      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-2xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm && (<input ref={name} className='w-full bg-gray-700 my-4 p-4' type ="text" placeholder='Full Name'/>)}
        <input ref={email} className='w-full bg-gray-700 my-4 p-4' type ="text" placeholder='Email Address'/>
        <input ref={password} className='w-full bg-gray-700 my-4 p-4' type ="password" placeholder='Password'/>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className='w-full bg-red-700 p-4 my-6 rounded-lg' onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className='py-1 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix! Sign-Up Now" : "Already a registered user! Log in"}</p>
      </form>
    </div>
  )
}

export default Login
