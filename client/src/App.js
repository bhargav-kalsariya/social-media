import Login from "./pages/login/Login";
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

      </Routes>
    </div>
  );
}

export default App;
