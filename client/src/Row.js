import React,{useState,useEffect} from 'react'
import axios from './axios'
import { UserAuth } from './Context/AuthContext';
import { db } from './firebase';
import { arrayUnion,updateDoc,doc } from 'firebase/firestore';
const base_url="https://image.tmdb.org/t/p/original/";
function Row  ({title,fetchUrl,isLargeRow}) {
    const[movies,setmovies]=useState([]);
    const [watchlist,setwatchlist]=useState(false);
    const [saved,setsaved]=useState(false);
    const {user}=UserAuth();
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
        
      }else{
        alert("Please Log in to Continue")
      }
     
    }

    useEffect(() =>{
     async function fetchdata(){
      const request= await axios.get(fetchUrl);
      setmovies(request.data.results)
      return request;
     }
     fetchdata();
    },[fetchUrl]);

  return (
    
    <div className="row ">
   <h2 className="text-2xl ease-in duration-300  hover:text-xl cursor-pointer ">{title}</h2>
   <div className="row_posters flex overflow-y-hidden overflow-x-scroll p-[20px]">
     {movies.map(movie =>(
      <img onClick={()=>addtolist(movie)}  key={movie.id}  className= {isLargeRow?"rows  h-[200px] object-contain w-full mr-10  hover:bg-black text-white  cursor-pointer ":"rows h-[120px] object-contain text-white w-full mr-10  cursor-pointer"} src={`${base_url}${ isLargeRow ?movie.poster_path:movie.backdrop_path}`} alt={movie.title}/>


     ))}
   </div>
    </div>
    
    
  )
}

export default Row