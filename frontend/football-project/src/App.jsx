import ClubList from "./ClubList"
import PlayerList from "./PlayerList"
import ClubDetail from "./ClubDetail"
import CreatePlayers from "./CreatePlayers"
import CreateClubs from "./CreateClubs"
import Navbar from "./Navbar"
import PlayerDetail from "./PlayerDetail"
import GuessingGame from "./GuessingGame"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import EditCLub from "./EditClub"

function App() {

  return (
    <>
      <Router>

        <Navbar/>

          <div className="content">
            <Routes>
              <Route path={"/"} element={<GuessingGame/>}/>

              {/* CLUBS */}
              <Route path="/clubs" element={<ClubList/>}/>
              <Route path='/clubs/:id/:name' element={<ClubDetail/>}/>
              <Route path="/:id/:name" element={<ClubDetail />} />
              <Route path='/create-clubs' element={<CreateClubs/>}/>
              <Route path='/clubs/:id/:name/edit' element={<EditCLub/>}/>

              {/* PLAYERS */}
              <Route path="/players" element={<PlayerList/>}/>
              <Route path="/players/:id/:name" element={<PlayerDetail/>}/>
              <Route path='/create-players' element={<CreatePlayers/>}/>


            </Routes>
          </div>
          
      </Router>
    </>
  )
}

export default App