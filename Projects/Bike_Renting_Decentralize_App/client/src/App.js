
import Navbar from "./components/Navbar.jsx"
import Home from "./components/Home.jsx"
import Dashboard from "./components/Dashboard.jsx"
import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
     </Routes>
 
    </>
  );
}

export default App;
