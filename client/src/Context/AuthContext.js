import { createContext,useContext,useState,useEffect} from "react";
import { auth,db } from "../firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth"
import { setDoc,doc } from "firebase/firestore";

const AuthContext=createContext();

export function AuthContextProvider({children}){
    const [user,setuser]=useState({});
    function createUser(email,password){
         createUserWithEmailAndPassword(auth,email,password);
         setDoc(doc(db,'users',email),{
            watchList:[],
            Plan:[]
         })
         return;
    }
    function logOut(){
        return signOut(auth); 
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    useEffect(()=>{
        const stateUser=onAuthStateChanged(auth,(currentUser)=>{
            setuser(currentUser);
        });
        return ()=>{
            stateUser();
        };
    }
    )
   return (
    <AuthContext.Provider value={{createUser,user,logOut,logIn}}>
    {children}
    </AuthContext.Provider>
   )
}

export function UserAuth(){
    return useContext(AuthContext)
}