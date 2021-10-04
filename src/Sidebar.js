import React,{useState,useEffect} from 'react'
import "./Sidebar.css";
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from "./SidebarChat";
 import db from "./Firebase.js";
import { useStateValue } from './StateProvider';
const Sidebar = () => {
  const [rooms,setrooms]=useState([]);
  const [{user},dispatch]=useStateValue();
  useEffect(() => {
      console.log(db.collection("rooms"));
    const unsubscribe=db.collection("rooms").orderBy("name").onSnapshot((snapshot)=>{
         setrooms(snapshot.docs.map((doc)=>{
             return({
                 
                 id:doc.id,
                 data:doc.data()
             }
             )
           
         })
         
         )
    
     })

     return ()=>{
         unsubscribe();
     }
     
  }, [])   
    return (
        console.log(user.photoURL),
        <div className="sidebar">
             <div className="sidebar_header">
             <Avatar src={user.photoURL}/>
             <div className="sidebar_headerright">
               <IconButton  >
               <DonutLargeIcon className="icon"/>
               </IconButton>
               <IconButton>
                 <ChatIcon className="icon"/>
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon className="icon"/>
                 </IconButton>
                 </div>
             </div>
             <div className="sidebar_search">
                 <div className="sidebar_searchcontainer">
                 <SearchOutlinedIcon className="searchicon"/>
                  <input placeholder="Search or start new chat" type="text"/>   
                     </div>
                  
             </div>
             <div className="sidebar_chats">
                  <SidebarChat addnewchat/>
                 {
                     rooms.map((room)=>{
                       return(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                       ) 
                    })
                 }  
                                       
                                       
                                                         

            </div>
                              

        </div>
    )
}

export default Sidebar
