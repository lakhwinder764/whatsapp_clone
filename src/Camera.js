import React,{useRef} from "react";
import Webcam from "react-webcam";
const Camera=()=>{
    let img="null";
    const webref=useRef(null)
    const capture=()=>{
       img=webref.current.getScreenshot();
    }
    return(
        <>
    <Webcam audio={false} width={350} ref={webref} height={350} screeenshotFormat="image/jpeg"
    videoConstraints={{width:1280,height:720,facingMode:"user"}}
    />
    
    <button onClick={capture}>Capture</button>
    <br/>
    <img src={img}/>
</>
    )


}  
export default Camera