import React,{useEffect,useState} from 'react';
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core"
import db from "./Firebase";
import {Link} from "react-router-dom";
const SidebarChat = ({id,name})=> {
    const [seed,setseed]=useState("");

    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000))
    },[])
   const createChat=()=>{
        const roomname=prompt("Please enter name for chat");
        if(roomname){
              db.collection("rooms").add({
                  name:roomname
              })            
        } 
   }
    return id?
           (
           <Link to={`/rooms/${id}`} >    
           <div className="sidebar_chat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="sidebarchat_info">  
          <h2>{name}</h2>
          <p>last message....</p>
          </div>
          </div>
          </Link>
          )
          :
          (
      <div onClick={createChat} className="sidebar_chat">
               <h2>Add new Chat</h2>   
          </div>
          )
    
    
}

export default SidebarChat
