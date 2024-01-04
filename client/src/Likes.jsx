import React from 'react'
import { useState,useEffect } from 'react';
import { UserAuth } from './Context/AuthContext';
import { db } from './firebase';
import {updateDoc,doc,onSnapshot} from "firebase/firestore"
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { FaArrowLeft } from "react-icons/fa";
import {TwitterShareButton,WhatsappShareButton,TwitterIcon,WhatsappIcon ,FacebookShareButton,FacebookIcon} from "react-share";
import { FaShare } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Likes = () => {
    const {user}=UserAuth();
    const [Movies,setMovies]=useState([]);
    const [Trailer,setTrailer]=useState('');
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.watchList);
        });
      }, [user?.email]);
    const movid=doc(db,'users',`${user?.email}`);
    const deletemovie=async(selected)=>{
      try{
       const result=Movies.filter((movie)=>movie.id!==selected)
       await updateDoc(movid,{
           watchList:result, 
       });
      }catch(error){
        console.log(error);
      }
      toast.error('Removed from Watchlist', {
        position: "top-center",
        autoClose: 15,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    const options = {
        height: '640',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const handleClick=(movie)=>{
       if(Trailer){
        setTrailer("");
       }else{
        movieTrailer(movie.title || "")
        .then((url)=>{
          const URLparams=new URLSearchParams(new URL(url).search);
          setTrailer(URLparams.get('v'));
        }).catch((error)=>console.log(error));
       }
    }
  return (
    <>{ !Trailer && 
    <div className="h-screen">
    <div  className='w-full h-[500px]'> 
    <img className='  absolute w-full h-[500px] object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt="/"></img>
    <div className="bg-black/60 fixed  top-0 left-0 w-full h-[500px]"></div>
    <div className="text-red-700 text-[2rem] font-bold fixed m-2"><Link to="/">TRAILERFLIX</Link></div>
    <ToastContainer
    position="top-center"
    autoClose={15}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
/>
    <div className="absolute top-[20%] p-4 md:p-8">
    <h1 className="font-bold text-3xl md:text-4xl text-white ">My WatchList</h1>
    </div>
    </div>
     <div className=" ">
          
    
   <div className="row_posters flex overflow-y-hidden overflow-x-scroll p-[20px]">
   {Movies.map((item) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img 
                className='w-full h-auto block '
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p onClick={()=>handleClick(item)} className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  Watch {item?.title}  Trailer
                </p>
                <p onClick={()=>{deletemovie(item.id)}}  className='absolute text-red-700 top-4 right-4'><MdDelete /></p>
              </div>
            </div>
          ))}
   </div>
    </div>
    </div>}
    { <div className="bg-black h-screen ">
        <div className="flex justify-between">
    <div className="text-red-700 text-[2rem] font-bold fixed m-2"><Link to="/">NETFLIX</Link></div>
    <p className="text-red-700 ml-[90%] mt-4 cursor-pointer ease-in duration-700 hover:text-white hover:ml-[89%] "><Link to="/"><FaArrowLeft size={40} /></Link></p>
    </div>
    Trailer && <div><Youtube videoId={Trailer} opts={options}/></div>
    <div className="flex p-4 space-x-4 bg-black w-full justify-center items-center ">
    <FaShare className="text-white text-xl hover:text-red-700 hover:text-2xl ease-in duration-700" />
    <FacebookShareButton url={`https://www.youtube.com/watch?v=${Trailer}`} hashtag='Hey Checkout this awesome trailer'><FacebookIcon size={32} round={true}></FacebookIcon></FacebookShareButton>
    <WhatsappShareButton url={`https://www.youtube.com/watch?v=${Trailer}`} hashtag='Hey Checkout this awesome trailer'><WhatsappIcon size={32} round={true}></WhatsappIcon></WhatsappShareButton>
    <TwitterShareButton url={`https://www.youtube.com/watch?v=${Trailer}`} title='Hey checkout this awesome movie'><TwitterIcon size={32} round={true}></TwitterIcon></TwitterShareButton>
    </div>
    </div>}
    </>
  )
}

export default Likes