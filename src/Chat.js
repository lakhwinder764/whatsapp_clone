import React,{useState,useEffect} from "react";
import { useParams } from "react-router";
import {Avatar,IconButton} from "@material-ui/core"
import "./Chat.css";
import firebase from 'firebase/compat/app';
import AttachFile from '@mui/icons-material/AttachFile';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import db from "./Firebase";
import useStateValue from "./StateProvider";
const Chat=()=>{
    const [seed,setseed]=useState("");
    const [input,setinput]=useState("");
    const {roomId}=useParams();
   const [messages,setmessages]=useState([]);
    const [roomname,setroomname]=useState("");
    // const [{user},dispatch]=useStateValue();
    useEffect(()=>{
      setseed(Math.floor(Math.random()*5000))
  },[])
   

    useEffect(()=>{
           if(roomId){
             db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>{
               setroomname(snapshot.data().name)
             })  
           }

        db.collection("rooms").doc(roomId).collection("messages")
        .orderBy("timestamp","asc").onSnapshot((snapshot)=>{
             setmessages(
               snapshot.docs.map((doc)=>{
              return(
                doc.data()
              );
               })
             )
        })   
    },[roomId])

    const sendmessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
          message:input,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          name:"lakhwinder"
        })
        setinput("");
       
    }
  return(
    // console.log(user.displayName),
      <div className="chat">
         <div className="chat_header">
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
             <div className="chatheader_info">
             <h3>{roomname}</h3>
             <p>Last seen at ...</p>
             </div>
             <div  className="chat_headerright">
             <IconButton  >
               <SearchOutlined/>
               </IconButton>
               <IconButton>
                 <AttachFile/>
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon/>
                 </IconButton>
                 </div>
         </div>  
         <div className="chat_body">
          {messages.map((message)=>{
            return(
                      <p className={`chat_message ${message.name==="lakhwinder" && `chat_reciever` }`}>
              
                      <span className="chat_name">
                          {message.name}
                          </span>
                          {message.message}
                          <span className="chat_timestamp">
          { new Date(message.timestamp?.toDate()).toUTCString()}
                              </span>
                  </p>
            ) 
          })}
          
         </div>  
         <div className="chat_footer">
             <InsertEmoticonIcon/>
             <form action>
                 <input type="text" placeholder="Type a message" onChange={(e)=>{
                     setinput(e.target.value);
                 }} />
                 <button type="submit" onClick={sendmessage}>Send a message</button>
             </form>
             <MicIcon/>
         </div>  

     </div>
  ) 
}
export default Chat;