import Login from "./pages/login/Login";
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useRef } from "react";

function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  const LoadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      LoadingRef.current?.continuousStart();
    } else {
      LoadingRef.current?.complete();
    }
  })

  return (
    <div className="App">

      <LoadingBar color='blue' ref={LoadingRef} />

      <Routes>

        <Route element={<RequireUser />}>
          <Route element={<Home />} >

            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />

          </Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

      </Routes>
    </div>
  );
}

export default App;
