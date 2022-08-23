import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import sad from "./sad.mp3";
import kawai from "./kawai.mp3";
import rage from "./rage.mp3";
import dinkknow from "./dinkknow.mp3";

let audioSource;
let analyser;


function Navbar() {
  
  const [bar, setbar ] = useState(true);
  const [music , setmusic ] = useState();
  const[kana , setkana] = useState(false);
 
  if(music ){
    music.play();
  }
  
  const letsdoit = ()=>{
  audio1.play();
  let el = document.getElementById("hi");
  
  el.play();
  const audioContext = new AudioContext();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftsize  = 16;
  const bufferlength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferlength);
  function animate(){
   
   const id =  requestAnimationFrame(animate);
   setTimeout(()=>{
    cancelAnimationFrame(id);
      }, 39000 )
  analyser.getByteFrequencyData(dataArray);
  for(let i = 0 ; i<bufferlength; i ++){
  
  if(dataArray[i] > 50 && dataArray[i] < 500){
  document.getElementById('hi').style.height = dataArray[i]*10+"px";
  document.getElementById('hi').style.width = dataArray[i]*10+"px";}
  }
}
animate();
}
useEffect(()=>{
  if(kana){
  document.getElementById("jai").click();}
},[kana])
  
  return (
    <>
    <div style={{color : "#f5f6fa", backgroundColor : "#ff3838", width : "100vw", height : "2.5rem", display:"flex", alignItems : "center", gap: "1rem", fontStyle: "monospace"}}>
      <div className="head">
      <a href="https://github.com/kavascgjmd"><img src={require("./kaneki-modified.png")} height="30" width="30" style={{marginLeft : "1rem"}}/></a>
  </div>
     <Link to="/" style = {{textDecoration: "none", color:"white" }}><div>Home</div></Link> 
      <div>Profile</div>
      <div>AnimeList</div>
      <Link to="/favourites" style ={{textDecoration: "none", color:"white" }}><div>Favourites</div></Link>
      
      <div style={{alignSelf : "flex-end", position:"absolute", right : "1rem", top:"0.5rem"}} onClick = {()=>{setbar(!bar)}}><i class="fa-solid fa-face-smile"></i></div>
    </div>
    {(kana)   ? <div >
        <div className ="rock" >
        <div onClick={() =>setkana(false)} style={{color : "white"}}><i className ="fa-solid fa-circle-xmark"></i></div>

          <button id ="jai" onClick={letsdoit}><img src = {require("./dance.gif")}></img></button>
          
          <div>
            
          <video width="320" height="240" id = "hi" >
          <source src={require("./kanashi.mp4")} type="video/mp4"/>
          </video>
          </div>
        </div>
      </div> :<></>

      }
    {
      bar  ? 
      <>
      <div className ="kanashi theme" id="kanashi">
        <div className='text' > You have to vibe with me </div>
        <div className ='counter' id ="counter">3</div>
      </div>
     
    <div className='music' style ={{position : "absolute", height:"7rem", width : "80%", backgroundColor : "red" ,top: 'calc(50vh - 2.5rem)', left: 'calc((100vw - 80%)/2)' }}>
     <div className ="theme" style={{fontSize : 12, color : "white"}}>Your Mood</div>  
      <div className = "theme" style ={{display : "flex", justifyContent:"space-around",alignItems: "center", fontSize : 8, color: "white"}}>
      <div className='nothing mus' onClick = {() =>{music ? music.pause() : ( console.log()); setmusic(new Audio())}}><img src ={require("./nothing.jpg")}></img>
      <div>nothing </div></div>
      <div className='dontknow mus ' onClick = {() => {music ? music.pause() : ( console.log());  setmusic(new Audio(dinkknow))}}><img src = {require("./confused.jpg")}></img>
      <div>confused </div></div>
      <div className= 'rage mus' onClick = {() =>  {music ? music.pause() : ( console.log());setmusic(new Audio(rage))}}><img src = {require("./rage.jpg")}></img>
      <div>RAGE </div></div>
      <div className= 'sad mus' onClick = {() =>  {music ? music.pause() : ( console.log());setmusic(new Audio(sad))}}><img src={require("./sad.jpg")}></img>
      <div>sad T-T </div></div>
      <div className= 'kawai mus' onClick = {() =>  {music ? music.pause() : ( console.log()); setmusic(new Audio(kawai))}}><img src = {require("./cute.jpg")}></img>
      <div>kawai :3 </div></div>
      <div className= 'dayuuum mus' onClick = {() =>{music ? music.pause() : ( console.log()); setmusic(new Audio()); setkana(false)}} onDoubleClick={() =>{document.getElementById("kanashi").style.display ="flex" ;
       const ele = document.getElementById("counter"); 
       let count = 9;
        let timerId = setInterval(()=>{
          count --;
          if(count <=3){
            ele.innerHTML = count;
          }
          if(count == 0){
          
              setkana(true);
             
               clearInterval(timerId);
          
          }

        }, 1000)
       }}  ><img src = {require("./dayum.jpg")}></img>
      <div >dayuuummm legendryyy 
        </div></div>
     </div>
     <div onClick = {()=>{setbar(!bar)}} className = "musi"style ={{position : 'absolute', bottom: "0.25rem", left : 'calc(49% )'}}><i className ="fa-solid fa-circle-xmark"></i></div>
    </div> </> : <></>}
   </>
  )
}

export default Navbar