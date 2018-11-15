import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return ( 
      <Stopwatch />
    );
  }
}

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      timesList: [],
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
    };
  }

  reset = () => {
    this.setState ({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format(time) {
    return (`${pad0(time.minutes)} : ${pad0(time.seconds)} : ${pad0(Math.floor(time.miliseconds))}`);
  }

  start = () => {
    if (!this.state.running) {
      this.setState ({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step = () => {
    if (!this.state.running) {
      return;
    }
    this.calculate();
  }

  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({
      times
    });
  }

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }

  lapTime = () => {
    let currentTime = document.querySelector('.stopwatch').textContent;
    this.setState ({
      timesList: [ ...this.state.timesList, currentTime]
    });
  }

  resetList = () => {
    this.setState ({
      timesList: []
    });
  }

  render() {
    return (
      <div className="container" >
      <nav className="controls">
        <button className="button" id="start" onClick={this.start}>Start</button>
        <button className="button" id="stop" onClick={this.stop}>Stop</button>
        <button className="button" id="reset" onClick={this.reset}>Reset</button>
      </nav>
        <div className="stopwatch">{this.format(this.state.times)}</div>
        <button className="button" id="lap-time" onClick={this.lapTime}>Lap Time</button>
        <button className="button" id="reset-list" onClick={this.resetList}>Reset List</button>
        <ol className="results">
          {this.state.timesList.map((time, index) => 
            <li key={index}>{time}</li>
          )}
        </ol>
      </div>
    )
  }
}

const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

export default App;