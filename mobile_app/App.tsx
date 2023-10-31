import React, { Component } from 'react'
import Login from './page/login'



export default class App extends Component {
  render() {
    var page = 0;
    Login.prototype.handleLoginPress = async () => {
      page = 2;
    };
    if (page = 1){
    return (
      <Login />
    )
    }
  } 
}
