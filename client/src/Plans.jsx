import React from 'react'
import { TiTick } from "react-icons/ti";
import { useState } from 'react';
import { UserAuth } from './Context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { arrayUnion,updateDoc,doc } from 'firebase/firestore';
import {loadStripe} from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const data = [
    {
      id: 1,
      title: "Basic",
      quality:"Good",
      resolution:"480p",
      price: 199.0,
      quantity:1

    },
    {
      id: 2,
      title: "Standard",
      quality:"Better",
      resolution:"1080p",
      price: 499.0,
      quantity:1

    },
    {
      id: 3,
      title: "Premium",
      quality:"Best",
      resolution:"4K HDR",
      price: 999.0,
      quantity:1

    },
  ];

const Plans = () => {
    //  const navigate=useNavigate();
    //  console.log(user.uid);
    //  console.log(user.email);
    const [plan,setplan]=useState(false);
    const {user}=UserAuth();
    const ID=doc(db,'users',`${user?.email}`)
     const handleclick=async(item)=>{
      if(user?.email){
        setplan(!plan);
       //  console.log(item.title)
        await updateDoc(ID,{
          Plans:arrayUnion({
            id:item.id,
            title:item.title,
            quality:item.quality
          })
        })
        toast.success('Loading Payment!!!', {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        const stripe = await loadStripe("pk_test_51OB9TcSB3m3uX235oYnbAGt7I1TflMXxSLco872UxB27EUY0KqPVTnXHR9z8V5OxPbeV0ZQpYz7rWDY7UKsTPriH005xaPamUu");
        const body = {
            products:[{id:item.id,title:item.title,price:item.price,quantity:item.quantity}]
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("https://trailerflix-1.onrender.com/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

    
        const session = await response.json();
    
        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        // console.log(result)
        // console.log(session.id)
        if(result.error){
            console.log(result.error);
        }    
      }else{
        alert("Please Log in to Continue")
      }
     }
  return (
  <div>
    <div className="flex flex-col  w-full mx-auto min-h-screen diagonal-background overflow-x-hidden bg-[#00000012]">
    <div className="text-red-700 text-[2rem] font-bold fixed m-2">TRAILERFLIX</div>
    <ToastContainer
      position="top-right"
      autoClose={20000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
/>
        <div className="md:text-3xl text-xl  mt-24 ml-[10%] md:ml-[20%]  text-white">Choose the plan that’s right for you</div>
        <div className="flex flex-col  ml-[20%] mt-4   ">
        <div className="flex space-x-2">
        <TiTick className='text-red-700' size={24}/>
        <div className="text-slate-700 text-lg  md:text-xl ease-in duration-700 hover:text-white">No commitments, cancel anytime. </div>
        </div>
        <div className="flex space-x-2">
        <TiTick className='text-red-700' size={24}/>
        <div className="text-slate-700 text-lg  md:text-xl hover:text-white ease-in duration-700">Everything on Netflix for one low price.</div>
        </div>
        <div className="flex space-x-2">
        <TiTick className='text-red-700' size={24}/>
        <div className="text-slate-700 text-lg  md:text-xl hover:text-white ease-in duration-700" >No ads and no extra fees. Ever.</div>
        </div>
        </div>
        <div
          className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8  place-items-center w-9/12 mx-auto
        mt-8"
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className=''
            >
              <div onClick={()=>handleclick(item)} className="text-4xl text-slate-700 text-center py-4 font-bold cursor-pointer hover:text-red-700 ease-in duration-700">
               {item.title}
              </div>
              <div onClick={()=>handleclick(item)} className='border-red-700 border-solid border-2 gap-2 rounded-md p-16 text-slate-700 cursor-pointer  hover:text-white hover:bg-red-700 ease-in duration-700'>
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-red-700 hover:text-white' size={24}/>
                Quality:{item.quality}
              </div>
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-red-700 hover:text-white' size={24}/>
                Resolution:{item.resolution}
              </div> 
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-red-700 hover:text-white' size={24}/>
                Price:₹{item.price}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-black hidden md:flex md:flex-col">
      <div className="  flex  justify-between">
            <ul>
                <li className=" text-white hover:text-red-700 ease-in duration-700 ml-12 mt-14 font-bold text-3xl">Watch your favourite shows
                </li>
                <li className=" text-white hover:text-red-700 ease-in duration-700 ml-12  mt-14 text-2xl">Save your favourites easily and always have
                    something to watch.</li>
            </ul>
            <img class="h-80 ml-32"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="/"/>

        </div>

        <div className="  flex  justify-between ">
            <img className="h-80 ml-32"
                src="https://occ-0-3216-3647.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABYjXrxZKtrzxQRVQNn2aIByoomnlbXmJ-uBy7du8a5Si3xqIsgerTlwJZG1vMpqer2kvcILy0UJQnjfRUQ5cEr7gQlYqXfxUg7bz.png?r=420" alt="/" />
            <ul>
                <li className=" font-bold text-white mt-14 hover:text-red-700 ease-in duration-700 mr-12 text-3xl">Share with Friends,Family.</li>
                <li className=" text-2xl text-white hover:text-red-700 ease-in duration-700 mt-14 mr-12">Share Your Favourite Movies with Friends,Family and BatchMates</li>
            </ul>

        </div>
        </div>
  </div>
  )
}

export default Plans