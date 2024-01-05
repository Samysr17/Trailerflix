import React,{useEffect,useState} from 'react'
import axios from './axios'
import requests from './requests';
import { Link } from 'react-router-dom';
import { UserAuth } from './Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { db } from './firebase';
import { arrayUnion,updateDoc,doc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';

function Banner ()  {
const {user,logOut}=UserAuth(); 
const[movies,setmovies]=useState([]);
const handleClick=async()=>{
 try{
   await logOut();
 }catch(error){
  console.log(error);
 }
}
useEffect(()=>{
    async function fetchdata(){
        const request= await axios.get(requests.requestPopular);
        setmovies(
            request.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ]
        );
        return request;
    }
    fetchdata();
},[]);
// console.log(movies);
function truncate(str,n){
    return str?.length>n ? str.substr(0,n-1)+".....":str;
}
    const [watchlist,setwatchlist]=useState(false);
    const [saved,setsaved]=useState(false);
    const movID=doc(db,'users',`${user?.email}`)
const addtolist=async(item)=>{
  if(user?.email){
    setwatchlist(!watchlist);
    setsaved(!saved);
   //  console.log(item.title)
    await updateDoc(movID,{
     watchList:arrayUnion({
       id:item.id,
       title:item.title,
       img:item.backdrop_path
     })
    })
    toast.success('Added To Watchlist', {
      position: "top-right",
      autoClose: 15,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    
  }else{
    alert("Please Log in to Continue")
  }
 
}

  return (
    <header className="banner h-auto"
    style ={{
          backgroundSize:"cover",
          backgroundImage:`url(
            "https://image.tmdb.org/t/p/original/${movies.backdrop_path}"
          )`,
          backgroundPosition:"center center",
          height:"80vh"
        }}
       > 
      <div className="flex items-center justify-between p-4">
    <div className="text-red-700  text-[1.5rem]  md:text-[2rem] font-bold fixed m-2">TRAILERFLIX</div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
/>
   {user?.email ?
    <div className=" flex  ml-[63%]  md:ml-[85%] ">
    <button className="text-white text-xs  md:pr-4 pr-1 sm:text-sm hover:text-red-700 ease-in duration-700  rounded cursor-pointer" ><Link to="/Likes">Watchlist</Link></button>
    <button onClick={handleClick} className="text-white bg-red-700 px-3 py-1 text-xs sm:px-6 sm:py-2 rounded cursor-pointer"><Link to="/Login">Log Out</Link></button>
  </div>
  :
  <div className=" flex ml-[85%] ">
  <button className="text-white text-xs pr-1 sm:pr-4 sm:text-sm  rounded cursor-pointer" ><Link to="/Home">Sign Up</Link></button>
  <button className="text-white bg-red-700 px-3 py-1 text-xs sm:px-6 sm:py-2 rounded cursor-pointer"><Link to="/Login">Log In</Link></button>
</div>
   }
    </div>
    <div className="banner_first ml-[30px] pt-[80px] h-[440px]">
     <h1 className="md:text-5xl text-4xl pb-[0.3rem] font-bold hover:text-red-700 ease-in duration-700 ">
        {movies?.title || movies?.name || movies?.original_name}{/*api response handling*/}
     </h1>
     <div className="buttons mt-4">
        <button onClick={()=>addtolist(movies)} className="pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] bg-[#666262] hover:bg-red-700 ease-in duration-700 text-white rounded-md">Add To Watchlist</button>
     </div>
     <h1 className="description hidden h-auto md:flex mt-4 w-[45rem] pt-[1rem] max-w-[360px] text-[1 rem] [400px]:hidden ">{movies?.overview}
     {truncate(movies?.overview,10)}
     </h1>
    
     </div>
     <div class="h-[16%] hidden  md:flex  bg-gradient-to-b  transparent from-transparent via-off-white to-black"/>
     
    </header>
    
  )
}

export default Banner
