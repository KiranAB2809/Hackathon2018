import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.react';
import Dashboard from './components/dashboard/dashboard.react';
import Home from './components/home/home.react';
import Main from './components/main/main.react';

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App