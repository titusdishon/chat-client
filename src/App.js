import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import {AuthProvider} from './context/auth'
import AuthRoute from './utils/authRoute';
import SinglePost from './pages/SinglePost';
import PostForm from "./components/PostForm";
import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const {mobileView, drawerOpen} = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
          ? setState((prevState) => ({...prevState, mobileView: true}))
          : setState((prevState) => ({...prevState, mobileView: false}));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
      <AuthProvider>
        <Router>
          <Navbar mobileView={mobileView} drawerOpen={drawerOpen} setState={setState}/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/new' component={PostForm}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/posts/:postId' component={SinglePost}/>
      </Router>
    </AuthProvider>
  );
}
 
export default App;
