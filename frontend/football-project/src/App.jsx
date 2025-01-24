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
              
            </Routes>
          </div>
          
      </Router>
    </>
  )
}

export default App