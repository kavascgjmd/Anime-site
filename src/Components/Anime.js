import React from 'react'
import {useState , useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



function Anime() {
  

    const [topAnime , SetTopAnime] = useState([]);
    
   const[hover, setHover] = useState();
   const[hover2 , setHover2] = useState();
   const[page , setPage ] = useState(1);
   const[favourites, setfavourites] = useState([]);
   const[bgcolor , setbgcolor ] = useState('black');
   const scrolling_function = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      
      setPage(page+1);
      
        window.removeEventListener('scroll',scrolling_function)
    }
  }   

  const handleFavourites = (animeObj)=>{
        let oldData = JSON.parse(localStorage.getItem('anime-app') || "[]");
        if(favourites.includes(animeObj.id)){
           oldData = oldData.filter((e)=>{
            return e.id !== animeObj.id
           })
        }
        else {
          oldData.push(animeObj)
        }
        localStorage.setItem('anime-app',JSON.stringify(oldData));

        let newArr = oldData.map((e)=>{
         return e.id;
        })
        setfavourites(newArr);
  }
const  getTopAnime = async ()=>{
   
   const AnimeDb = await fetch('https://graphql.anilist.co', {
    method : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `
        {
            Page(page: ${page}){
             media(sort : FAVOURITES_DESC){
               
               id
               coverImage {
                 extraLarge
                 large
                 medium
                 color
               }
               title {
                 romaji
                 english
                 native
                 userPreferred
               }
               trailer{
                 id
                 
               }
               episodes
               popularity
               genres
               averageScore
               type
             
             }
           }
           }
          `
       
    })
}).then((response) =>{
    return response.json();
}).then((data) =>{
  return  data.data.Page.media;
})
let AnimeDB = [...topAnime, ...AnimeDb];
// console.log("new",AnimeDb);

SetTopAnime(AnimeDB);
}
useEffect(()=>{

  getTopAnime();
 
  window.addEventListener('scroll', scrolling_function);
 

},[page]);




return (
    <>
  <div className= "theme" style={{backgroundColor : "white"}}>All time Popular</div>
  {
    
    topAnime.length === 0 ?  
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner> : <div style={{display : "flex", flexWrap : "wrap",justifyContent : "space-around"}} >
  
     
  
    {
    topAnime.map((AnimeObj)=>(
    
      <Card onMouseOver={()=>{setHover(AnimeObj.id)}} onMouseOut = {()=>{setHover()}} style={{ width: '10rem' , height : "14rem", marginBottom: "1rem"}}>
      <Card.Img className = "imgset" variant="top" src={AnimeObj.coverImage.extraLarge} />
    
        { hover === AnimeObj.id ? 
        <>
        <div className='base' onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}}></div>
        {AnimeObj.trailer ? 
        <Button className = "add-remove big" ><a href = {"https://www.youtube.com/watch?v="+AnimeObj.trailer.id}><img src = {require("./try.gif")} className="add" onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}} ></img></a></Button> 
        :<Button className = "add-remove big" ><img src = {require("./try.gif")} className="add" onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}} ></img></Button> 
        
         }
        {
          hover2 === AnimeObj.id ? <div className='big'><div className='addFavourites' onClick = {()=>{handleFavourites(AnimeObj)}} onMouseOver={()=>{setHover2(AnimeObj.id)}} onMouseOut = {()=>{setHover2()}} >
           {favourites.includes(AnimeObj.id) ?<i class="fa-solid fa-minus"></i> : <i class="fa-solid fa-plus"></i>} 
          </div></div> : <></>
        }
        <div className = "ReviewCard">
        <div className='Name' style ={{fontSize : 12, display : "flex" , fontWeight : "bold", justifyContent: 'space-between'}}>
            <div>{AnimeObj.title.english}</div>
            <div style={{right : 0}}>{AnimeObj.averageScore}</div>
        </div>
        
        <div className="Type" style = {{fontSize : 10, display : "flex" }}>
            <div>{AnimeObj.type}</div>
            <div style={{marginLeft : "1rem"}}>{AnimeObj.episodes} Episodes</div>
        </div>
        <div style={{display : "flex", justifyContent: "space-around", flexWrap: 'wrap', alignItems : "flex-end", alignSelf : "flex-end"}}>
        {
          AnimeObj.genres.map((genre)=>(
            <div className='genre' style = {{fontSize : 10, color : "white", backgroundColor : "red" , borderRadius: 15, height: "1rem" , width: "auto", margin: "0.2rem",padding : "0.4rem", display : "flex", alignItems: "center"}}>{genre}</div>
          ))
        }
       </div>
        
    </div>
    </>: <></>}
     
    </Card>
    ))
  }
</div>
  }
  </>
)
}

export default Anime