import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DatePicker from "./datepicker";

class App extends Component {
  handleSave = date => {
    console.log("date selected: ", date);
  };
  handleCancel = data => {
    console.log(data);
  };
  render() {
    let date = new Date();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DatePicker
          dateSelected={date}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
        {/* <DatePicker /> */}
      </div>
    );
  }
}

export default App;
