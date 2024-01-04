import React,{useState,useEffect} from 'react'
import axios from './axios'
import { UserAuth } from './Context/AuthContext';
import { db } from './firebase';
import { arrayUnion,updateDoc,doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdChevronLeft,MdChevronRight } from "react-icons/md"

const base_url="https://image.tmdb.org/t/p/original/";
function Row  ({title,fetchUrl,isLargeRow,rowId}) {
    const[movies,setmovies]=useState([]);
    const [watchlist,setwatchlist]=useState(false);
    const [saved,setsaved]=useState(false);
    const {user}=UserAuth();
    // console.log(user.uid);
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
    const moveLeft=()=>{
      var slider=document.getElementById('slider'+rowId);
      slider.scrollLeft=slider.scrollLeft-500;
    }
    const moveRight=()=>{
      var slider=document.getElementById('slider'+rowId);
      slider.scrollLeft=slider.scrollLeft+500;
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
   <div id={'slider'+rowId} className="row_posters flex overflow-y-hidden overflow-x-scroll p-[20px] group ">
      <MdChevronLeft onClick={moveLeft} size={40}  className='bg-white mt-8 text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'/>
     {movies.map(movie =>(
      <img onClick={()=>addtolist(movie)}  key={movie.id}  className= {isLargeRow?"rows  h-[200px] object-contain w-full mr-10  hover:bg-black text-white  cursor-pointer ":"rows h-[120px] object-contain text-white w-full mr-10  cursor-pointer"} src={`${base_url}${ isLargeRow ?movie.poster_path:movie.backdrop_path}`} alt={movie.title}/>
      

     ))}
     <MdChevronRight onClick={moveRight} size={40} className='bg-white mt-8 text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'/>
   </div>
    </div>
    
    
  )
}

export default Row