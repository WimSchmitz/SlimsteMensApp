import React, { Component } from 'react';
import './App.css';

class TimerBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: props.teamName,
      running: false,
      time: props.startTime
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    if (this.state.running) {
      const oldTime = this.state.time
      this.setState({
        time: oldTime-1
      })
    }
  }

  startStop() {
    const oldStatus = this.state.running
    this.setState({
      running: !oldStatus
    })
    console.log(this.state.running)
  }

  adjustSeconds(i) {
    this.setState({
      time: this.state.time + i
    })
  }

  render() {
    return (
      <div className="box">
        <div class="row">
          <TeamName defaultName={this.props.defaultName}/>
        </div>
        <div class="row">
          <div class={this.state.running? "time-box-active" : "time-box-inactive"}>
          	{this.state.time>0 ? this.state.time : 0}
          </div>
        </div>
        <div class="row">
          <div class="button-row-startstop">
            <button class="button" onClick={() => this.startStop()}>
              {this.state.running ? 'Stop' : 'Start'}
            </button>
          </div>
          <div class="button-row-seconds">
            <button class="button" onClick={() => this.adjustSeconds(20)}>
              +20
            </button>
            <button class="button" onClick={() => this.adjustSeconds(-20)}>
              -20
            </button>
            <button class="button" onClick={() => this.adjustSeconds(10)}>
              +10
            </button>
          </div>
        </div>
      </div>
    )
  }
}

class TeamName extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      name: props.defaultTeamName,
      customNameSet: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    console.log("Team name entered")
    console.log(event)
    this.setState({
      name: this.state.value,
      customNameSet: true
    })
    event.preventDefault();
  }

  render(){
    if (this.state.customNameSet) {
      return (
        <div>
          {this.state.name}
        </div>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder={this.props.defaultName} onChange={this.handleChange} />
        </form>
      )
    }
  }
}

class TimerScreen extends Component {
  render() {
    return (
      <div className="container">
        <TimerBox startTime={60} defaultName="Team 1"/>
        <TimerBox startTime={60} defaultName="Team 2"/>
        <TimerBox startTime={60} defaultName="Team 3"/>
        <TimerBox startTime={60} defaultName="Team 4"/>
      </div>

    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1> De SLIMSTE JINNERS</h1>
        <h2> Van Lod Lavki</h2>
        <TimerScreen />
      </div>
    )
  }
}

export default App;
