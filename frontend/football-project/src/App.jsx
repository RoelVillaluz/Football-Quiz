import ClubList from "./ClubList"
import PlayerList from "./PlayerList"
import CreatePlayers from "./CreatePlayers"
import CreateClubs from "./CreateClubs"
import Navbar from "./Navbar"
import GuessingGame from "./GuessingGame"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>

        <Navbar/>

          <Routes>
            <Route path={"/"} element={<GuessingGame/>}/>
            <Route path="/clubs" element={<ClubList/>}/>
            <Route path="/players" element={<PlayerList/>}/>
            <Route path='/create-players' element={<CreatePlayers/>}/>
            <Route path='/create-clubs' element={<CreateClubs/>}/>
            
          </Routes>
          
      </Router>
    </>
  )
}

export default App