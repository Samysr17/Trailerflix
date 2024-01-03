import React,{useEffect,useState} from 'react'
import axios from './axios'
import requests from './requests';
import { Link } from 'react-router-dom';
import { UserAuth } from './Context/AuthContext';

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
  return (
    <header className="banner"
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
    <div className="text-red-700 text-[2rem] font-bold fixed m-2">NETFLIX</div>
   {user?.email ?
    <div className=" flex ml-[85%] ">
    <button className="text-white text-xs pr-1 sm:pr-4 sm:text-sm  rounded cursor-pointer" ><Link to="/Likes">Watchlist</Link></button>
    <button onClick={handleClick} className="text-white bg-red-700 px-3 py-1 text-xs sm:px-6 sm:py-2 rounded cursor-pointer"><Link to="/Login">Log Out</Link></button>
  </div>
  :
  <div className=" flex ml-[85%] ">
  <button className="text-white text-xs pr-1 sm:pr-4 sm:text-sm  rounded cursor-pointer" ><Link to="/Home">Sign Up</Link></button>
  <button className="text-white bg-red-700 px-3 py-1 text-xs sm:px-6 sm:py-2 rounded cursor-pointer"><Link to="/Login">Log In</Link></button>
</div>
   }
    </div>
    <div className="banner_first ml-[30px] pt-[80px] h-[490px]">
     <h1 className="text-[3rem] pb-[0.3rem] font-bold">
        {movies?.title || movies?.name || movies?.original_name}{/*api response handling*/}
     </h1>
     <div className="buttons space-x-4">
        <button className="pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] bg-[#666262] hover:bg-red-500 text-white rounded-md">Play</button>
        <button className="pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] bg-[#666262] text-white hover:bg-red-500 rounded-md">Watch Later</button>
     </div>
     <h1 className="description w-[45rem] pt-[1rem] max-w-[360px] text-[1 rem] [400px]:hidden ">{movies?.overview}
     {truncate(movies?.overview,10)}
     </h1>
     </div>
     <div class="h-[7.4rem]  bg-gradient-to-b 180deg transparent from from-transparent via-off-white to-black"/>
    </header>
    
  )
}

export default Banner