import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown'
const N = 1e5;
import {useState , useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { filter } from '@chakra-ui/react';

const options = [
    { label: 'All Genre', value : 'All Genre'},
    { label: 'Action', value: 'Action' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Drama', value: 'Drama' },
    { label: 'Ecchi', value: 'Ecchi' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Mahou Shoujo', value: 'Mahou Shoujo' },
    { label: 'Mehca', value: 'Mecha' },
    { label: 'Psychological', value: 'Psycological' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Sci-Fi', value: 'Sci-Fi' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Supernatural', value: 'Supernatural' },
    { label: 'Thriller', value: 'Thriller' }
]
function Favourites() {

    const [topAnime , SetTopAnime] = useState([]);
    
    const[hover, setHover] = useState();
    const[hover2 , setHover2] = useState();
   
   const[currentcard, setcurrentcard] = useState();
   const[reorder, setbutton] = useState(0);
   const[x,setx] = useState(0);
   const[currentgen , setgen] = useState('All Genre')
   const[Search, setsearch] = useState('');
    // const drop = e =>{
    //     const card_id = e.dataTransfer.getData('card_id');
    //     const card = document.getElementById(card_id);
    //     card.style.display = 'block';
    //     e.target.appendChild(card);
    // }
    
    // const Drop = e =>{
        
    //     const card_id = e.dataTransfer.getData('card_id')
    //     const card = document.getElementById(card_id);
    //     card.style.display = 'block';
        
   
   
    // }

  

    const dragStart = e =>{
        const target = e.target;
        setcurrentcard(e.target.id);
        
        
    }
    const dragover = e =>{
        e.preventDefault();
    }
 
    const handledragEnter = e => {

        
        let newAnimedb = [...topAnime];
        if(e.target.id > (currentcard)%N ){
        let a = newAnimedb[currentcard%N];
        console.log(a);
        newAnimedb.splice(currentcard%N , 1 );
        newAnimedb.splice(e.target.id-1, 0 , a );

        SetTopAnime(newAnimedb);
        }
        else {
            let a = newAnimedb.splice((currentcard)%N , 1)[0];
            newAnimedb.splice(e.target.id, 0 , a );
            SetTopAnime(newAnimedb);
        }
 
    }
    
    const handlegenre = () =>{
      let x = document.getElementById('browser').value;
     let genre = [];
     for(let i = 0; i<options.length; i++){
      genre.push(options[i].value);
     }
      if(genre.includes(x)){
        setgen(x);
        
      }
 
    
     
    }

    const removeFavourite = e=>{
     let x = Number(e.target.parentNode.id) ;
    
     let newAnimedb = [...topAnime];
      newAnimedb = newAnimedb.filter((ani)=>{

     return ani.id !== x
     })
 
     localStorage.setItem('anime-app',JSON.stringify(newAnimedb));
     SetTopAnime(newAnimedb);
    
    }
   const color = ["red","black"];
  const  getTopAnime =  ()=>{
   
    const AnimeDb = JSON.parse(localStorage.getItem('anime-app') || "[]");

 
 SetTopAnime(AnimeDb);
 }
 useEffect(()=>{
 
   getTopAnime();

 },[]);

 let filterarr = [];
 if(Search === ''){
   filterarr = topAnime;
 }
 else {
   filterarr = topAnime.filter((animeObj)=>{
    let search = Search.toLowerCase();
    return animeObj.title.english.toLowerCase().includes(search);
   })
 }
 if(currentgen !== "All Genre"){

  filterarr = topAnime.filter((anime)=>{
     return anime.genres.includes(currentgen);
  })
  
 }
    return (
        <>
      <div className = "profile">
     <img src ={require("./deadjjj.webp")} style= {{left : 0,top:"2.5rem", position:'absolute' }}></img>
      </div>
            <div className="Main">
                <div  style={{display : "flex" , justifyContent: "space-around", alignItem: "center",flexWrap: "wrap", width: "90%",marginLeft: "3.5rem"}}>
                    <div >
                        
                        <form>
                            <input list="browsers" name="browser" id="browser" style={{ fontSize: 12 , outline:"none", border:"none",backgroundColor:"red", color:"white"}} placeholder="All Genre" onChange={handlegenre}/>

                            <datalist id="browsers" >
                                {
                                    options.map((option) => (
                                        <option value={option.value} />
                                    ))
                                }

                            </datalist>


                        </form>
                    </div>
                    <div >
                        
                        {
                            reorder ? <button onClick={()=>{setbutton(!reorder) ; setx(reorder ? 1 : 0) }} style ={{backgroundColor : "red" , outline : 0, border: 0 , color:"white", height: "1.25rem", display: "flex", alignItems:'center',marginTop: "0.25rem",fontSize : 12}}>Reorder </button>
                            :
                            <button onClick={()=>{setbutton(!reorder) ; setx(reorder ? 1 : 0) }  } style ={{backgroundColor : "black" , outline : 0, border: 0 , color:"white", height: "1.25rem", display: "flex", alignItems:'center',marginTop: "0.25rem",fontSize : 12}}>Reorder </button>
                        }
                        
                    </div>
                    <div >
                        <input type = "text" style={{fontSize : 12, outline:"none", border:"none",backgroundColor:"red", color:"white",width:"50rem"} } placeholder="Search" value = {Search} onChange={(e)=>{setsearch(e.target.value)}}></input>
                    </div>
                    
                </div>

            </div>
            
            <div style= {{display: "flex", justifyContent:"center"}}>
     
            <div className = " board fav" style={{backgroundColor: "white", width : "90%"}} >
  {
    
    topAnime.length === 0 ?  
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner> : <div style={{display : "flex", flexWrap : "wrap",justifyContent : "space-around"}} >
  
     
  
    {
    filterarr.map((AnimeObj, index = 0)=>(
      
      <Card id = { AnimeObj.id*N + index}  onDragEnter={handledragEnter} draggable={reorder} onDragStart={dragStart} onDragOver = {dragover}  onMouseOver={()=>{setHover(AnimeObj.id)}} onMouseOut = {()=>{setHover()}} style={{ width: '6rem' , height : "8.5rem", margin: "0.25rem"}}>
      <Card.Img className = "imgset" variant="top" src={AnimeObj.coverImage.extraLarge} draggable={false} id = {index}/>
    
        { hover === AnimeObj.id && !reorder ? 
        <>
        <div className='base' onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}}></div>
        <Button className = "add-remove big" ><img src = {require("./try.gif")} className="add" onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}} ></img></Button> 
        {
          hover2 === AnimeObj.id ? <div className='big'><div className='addFavourites' id = {AnimeObj.id} onClick={removeFavourite} onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}} >
           <i className="fa-solid fa-minus"></i>
          </div></div> : <></>
        }
        <div className = "ReviewCard">
        <div className='Name' style ={{fontSize : 14, display : "flex" , fontWeight : "bold", justifyContent: 'space-between'}}>
            <div>{AnimeObj.title.english}</div>
            <div style={{right : 0}}>{AnimeObj.averageScore}</div>
        </div>
        
        <div className="Type" style = {{fontSize : 12, display : "flex" }}>
            <div>{AnimeObj.type}</div>
            <div style={{marginLeft : "1rem"}}>{AnimeObj.episodes} Episodes</div>
        </div>
        <div className='genre' style = {{fontSize : 10}}>{AnimeObj.genres}</div>
        
    </div>
    </>: <></>}
    
    </Card>
    
    ))
  }
</div>
  }
            </div>
            </div>
        </>
    )
}

export default Favourites

