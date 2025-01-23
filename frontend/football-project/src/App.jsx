import ClubList from "./Clubs/ClubList"
import CreateClubs from "./Clubs/CreateClubs"
import ClubDetail from "./Clubs/ClubDetail"
import EditCLub from "./Clubs/EditClub"

import PlayerList from "./Players/PlayerList"
import CreatePlayers from "./Players/CreatePlayers"
import PlayerDetail from "./Players/PlayerDetail"
import EditPlayer from "./Players/EditPlayer"

import Navbar from "./Navbar"
import GuessingGame from "./GuessingGame"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>

        <Navbar/>

          <div className="content">
            <Routes>
              
              {/* MAIN */}
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
              <Route path='/players/:id/:name/edit' element={<EditPlayer/>}/>

            </Routes>
          </div>
          
      </Router>
    </>
  )
}

export default App