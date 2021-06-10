import React from 'react';
import './App.css';
import axios from "axios";

import InGame from "./components/InGame";
import RecommendViewer from "./components/RecommendViewer";



var electron = window.require('electron');
var ipc = electron.ipcRenderer;



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      bannedChampions: [],
      host: "",
      headers: {},
      data: {},
      isBP: true,
      bans: {blue: [0, 0, 0, 0, 0], purple: [0, 0, 0, 0, 0]},
      picks: {blue: [0, 0, 0, 0, 0], purple: [0, 0, 0, 0, 0]}
    }
  }

  componentDidMount(){
    const self = this
    ipc.on('leagueClientOn', async (event, data) => {
      let host = data.protocol + "://" + data.address + ":" + data.port;
      let url = host + "/lol-summoner/v1/current-summoner";
      let token = btoa(data.username + ":" + data.password)
      let headers = {
        headers: {
          Authorization: `Basic ${token}` //the token is a variable which holds the token
        }
      }

      this.setState({
        host: host,
        headers: headers,
        data: data
      })

      while(true)
      {
        await new Promise(resolve => setTimeout(resolve, 1000));
        axios
          .get(url, headers)
          .then(({ data }) => {
            self.setState({
              username: data.displayName
            });
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
        if (this.state.username !== "")
          break;
      }

      ipc.send("wsready")
    });

    ipc.on('wsUpdate', (event, data) => {

      if (data.eventType === "Create")
        self.setState({isBP: true})
      if (data.eventType === "Delete")
        self.setState({isBP: false})

      let newState = {
        bans: {
          blue: data.data.bans.myTeamBans.concat(Array.from(Array(5- data.data.bans.myTeamBans.length), () => 0)),
          purple: data.data.bans.theirTeamBans.concat(Array.from(Array(5- data.data.bans.theirTeamBans.length), () => 0))
        },
        picks: {
          blue: data.data.myTeam.map( e => e.championId).concat(Array.from(Array(5- data.data.myTeam.length), () => 0)),
          purple: data.data.theirTeam.map( e => e.championId).concat(Array.from(Array(5- data.data.theirTeam.length), () => 0))
        }
      }
      self.setState(newState)
    })
  }

  render() {
    let greeting;
    if (this.state.username === "") {
      greeting = "Waiting for League of Legends Client"
    }
    else {
      greeting = `Hello, ${this.state.username}`
    }

    return (
      <div className="App">
        <div className="greeting">
          {greeting}
        </div>

        {this.state.isBP &&
          <div>
            <InGame
              bans={this.state.bans}
              picks={this.state.picks}/>
            <RecommendViewer recommends={[{championKey: 30},
            {championKey: 31},
            {championKey: 32}]}
            title="Bantley OP"/>
            <RecommendViewer recommends={[{championKey: 33},
            {championKey: 34},
            {championKey: 35}]}
            title="Most Pick"/>
          </div>
        }

      </div>

    );
  }

}

export default App;
