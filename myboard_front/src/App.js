import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";

import Stores from './Stores';
import Home from './Home';
import Board from './Board';
import Header from "./Header";
import Join from "./Join";
import Login from "./Login";
import Post from "./Post";
import MyPage from "./MyPage";

function App() {
  return (
    <Provider stores={Stores}>
      <BrowserRouter>
          <Header/>
        <section className='app-body'>
          <Route path='/' exact component={Home}/>
          <Route path='/board/:idx' component={Board}/>
          <Route path='/join' component={Join}/>
          <Route path='/login' component={Login}/>
          <Route path='/category/:cate' component={Home}/>
          <Route path='/write' exact component={Post}/>
          <Route path='/write/:idx' component={Post}/>
          <Route path='/mypage' component={MyPage}/>
        </section>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
