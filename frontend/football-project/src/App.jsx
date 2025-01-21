import ClubList from "./ClubList"
import PlayerList from "./PlayerList"
import ClubDetail from "./ClubDetail"
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

          <div className="content">
            <Routes>
              <Route path={"/"} element={<GuessingGame/>}/>
              <Route path="/clubs" element={<ClubList/>}/>
              <Route path='/clubs/:id/:name' element={<ClubDetail/>}/>

              <Route path="/players" element={<PlayerList/>}/>
              <Route path='/create-players' element={<CreatePlayers/>}/>
              <Route path='/create-clubs' element={<CreateClubs/>}/>

            </Routes>
          </div>
          
      </Router>
    </>
  )
}

export default App