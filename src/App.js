import logo from './logo.svg';
import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import Anime from './Components/Anime';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router,Switch  , Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
          <Route path ='/' exact render={()=>(
       <>
       <Banner></Banner>
       <Anime></Anime>
       </>
          )
    
          }/>
          <Route path = '/favourites' component={Favourites}></Route>
          </Switch>
      
     {/* <Banner/>
    <Anime/> 
  <Favourites/> */}
      </Router>
    
    
    </div>
  );
}

export default App;
